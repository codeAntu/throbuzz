import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import jwt from 'jsonwebtoken'
import Post from '@/models/postModel'

connect()

const dataZ = z.object({
  text: z.string().min(1).max(500).optional(),
  visibility: z.enum(['public', 'private']).optional(),
  postId: z.string(),
})

export async function POST(request: NextRequest) {
  const body = await parseJson(request)
  if (body instanceof NextResponse) return body

  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const validData = dataZ.safeParse(body)

    if (!validData.success) {
      return NextResponse.json({ error: validData.error }, { status: 400 })
    }

    const { text, visibility, postId } = validData.data

    console.log({ text, visibility, postId })

    const post = await Post.findOneAndUpdate(
      { _id: postId },
      {
        text,
        visibility,
      },
    )

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ status: 200, message: 'Post updated successfully' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 400,
      },
    )
  }
}
