import { connect } from '@/dbConfig/dbConfig'
import { CloudinaryImageResponse, TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { parseJson } from '@/utils/utils'
import { z } from 'zod'
import imageUpload from '@/cloudinary/cloudinaryUploadImage'
import Post from '@/models/postModel'
import { errorToJSON } from 'next/dist/server/render'
import User from '@/models/userModel'
import { color } from 'framer-motion'
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
  text: z.string().min(1).max(500).optional(),
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

    if (!validatedText || !validatedImages) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const publicIds: string[] = []

    if (validatedImages && validatedImages.length) {
      for (const image of validatedImages) {
        try {
          const result = (await imageUpload(image)) as CloudinaryImageResponse
          publicIds.push(result.public_id)
        } catch (error: any) {
          return NextResponse.json({ error: error.message }, { status: 500 })
        }
      }
    }

    console.log(publicIds)

    const post = new Post({
      text: validatedText || '',
      visibility: validatedVisibility || 'public',
      publicIds: publicIds || [],
      userId: tokenData.id,
      color: validatedColor || 'stone',
    })

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
