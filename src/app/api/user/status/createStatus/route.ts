import imageUpload from '@/cloudinary/cloudinaryUploadImage'
import { connect } from '@/dbConfig/dbConfig'
import { CloudinaryImageResponse, TokenDataT } from '@/lib/types'
import Status from '@/models/status'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

connect()

const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
const imageSchema = z
  .union([z.instanceof(File), z.undefined(), z.null()])
  .refine((file) => !file || file.size <= maxSizeInBytes, {
    message: 'Image must be less than 5MB',
  })

const dataZ = z
  .object({
    text: z.string().max(500).optional(),
    visibility: z.enum(['public', 'friends']).optional(),
    image: imageSchema.optional(),
  })
  .refine((data) => data.text || data.image, {
    message: 'Either text or image is required',
    path: ['text'],
  })

export async function POST(request: NextRequest) {
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
    const image = formData.get('image') as File

    const validationResult = dataZ.safeParse({ text, visibility, image })
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 })
    }
    const { text: validatedText, image: validatedImage, visibility: validatedVisibility } = validationResult.data

    let statusImage: { publicId: string; imageUrl: string } | undefined
    if (validatedImage) {
      try {
        const result = (await imageUpload(validatedImage)) as CloudinaryImageResponse
        statusImage = {
          publicId: result.public_id,
          imageUrl: result.secure_url,
        }
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    const status = new Status({
      user: user._id,
      text: validatedText,
      visibility: validatedVisibility || 'public',
      image: statusImage,
    })

    await status.save()

    return NextResponse.json(
      {
        message: 'Status created successfully',
        status,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
