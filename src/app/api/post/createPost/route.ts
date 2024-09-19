import { connect } from '@/dbConfig/dbConfig'
import { CloudinaryImageResponse, TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { parseJson } from '@/utils/utils'
import { z } from 'zod'
import imageUpload from '@/cloudinary/cloudinaryUploadImage'
import Post from '@/models/postModel'

connect()

const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
const imageSchema = z.instanceof(File).refine((file) => file.size <= maxSizeInBytes, {
  message: 'Each image must be less than 5MB',
})

const dataZ = z.object({
  text: z.string().min(1).max(500).optional(),
  isPrivate: z.boolean().optional(),
  images: z.array(imageSchema).max(10).optional(),
})

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const data = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(data) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const text = formData.get('text') as string
    const isPrivate = formData.get('isPrivate') === 'true'
    const images = formData.getAll('images') as File[]

    const validationResult = dataZ.safeParse({ text, isPrivate, images })
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 })
    }
    const { text: validatedText, isPrivate: validatedIsPrivate, images: validatedImages } = validationResult.data

    const publicIds: string[] = []

    if (images && images.length) {
      for (const image of images) {
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
      text: validatedText,
      isPrivate: validatedIsPrivate,
      publicIds: publicIds,
      user: tokenData.id,
    })

    await post.save()

    console.log(post)

    return NextResponse.json(
      {
        message: 'Post created successfully',
        post: {
          text: post.text,
          isPrivate: post.isPrivate,
          publicIds: post.publicIds,
          likes: post.likes,
          comments: post.comments,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
