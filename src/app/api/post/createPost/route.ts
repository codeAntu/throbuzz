import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { parseJson } from '@/utils/utils'
import { z } from 'zod'

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
  const body = await request.formData()
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const text = body.get('text') as string
    const isPrivate = body.get('isPrivate') === 'true'
    const images = body.getAll('images') as File[]

    // Validate the data using Zod
    const validationResult = dataZ.safeParse({ text, isPrivate, images })
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 })
    }

    const { text: validatedText, isPrivate: validatedIsPrivate, images: validatedImages } = validationResult.data

    // create post

    return NextResponse.json({ message: 'Post created successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
