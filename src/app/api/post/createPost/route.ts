import { connect } from '@/dbConfig/dbConfig'
import { CloudinaryImageResponse, TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { parseJson } from '@/utils/utils'
import { z } from 'zod'
import imageUpload from '@/cloudinary/cloudinaryUploadImage'
import Post from '@/models/postModel'
import User from '@/models/userModel'
import { colorNames } from '@/lib/const'

// Ensure colorNames is a tuple with at least one string element
const colorNamesTuple = colorNames as [string, ...string[]]

connect()

const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
const imageSchema = z.instanceof(File).refine((file) => file.size <= maxSizeInBytes, {
  message: 'Each image must be less than 5MB',
})

const dataZ = z.object({
  color: z.enum(colorNamesTuple).optional(),
  text: z.string().max(500).optional(),
  visibility: z.enum(['public', 'private']).optional(),
  images: z.array(imageSchema).max(5).optional(),
})

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = await User.findById(tokenData.id)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const text = formData.get('text') as string
    const visibility = formData.get('visibility') as string
    const images = formData.getAll('images') as File[]
    const color = formData.get('color') as string

    const validationResult = dataZ.safeParse({ text, visibility, images, color })
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 })
    }
    const {
      text: validatedText,
      images: validatedImages,
      visibility: validatedVisibility,
      color: validatedColor,
    } = validationResult.data

    console.log(validatedText, validatedImages, validatedVisibility, validatedColor)

    if (!validatedText && !validatedImages?.length) {
      return NextResponse.json({ error: 'Post must have text or image' }, { status: 400 })
    }

    const postImages: {
      publicId: string
      imageUrl: string
    }[] = []

    if (validatedImages && validatedImages.length) {
      for (const image of validatedImages) {
        try {
          const result = (await imageUpload(image)) as CloudinaryImageResponse
          postImages.push({
            publicId: result.public_id,
            imageUrl: result.secure_url,
          })
        } catch (error: any) {
          return NextResponse.json({ error: error.message }, { status: 500 })
        }
      }
    }

    console.log(postImages)

    const post = new Post({
      userId: user._id,
      text: validatedText,
      visibility: validatedVisibility || 'public',
      postImages,
      color: validatedColor || 'stone',
    })

    console.log(post)
    console.log(post.postImages)

    await post.save()

    user.postsCount += 1
    await user.save()

    return NextResponse.json(
      {
        message: 'Post created successfully',
        post,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
