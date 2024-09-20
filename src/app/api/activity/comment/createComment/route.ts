import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Post from '@/models/postModel'
import jwt from 'jsonwebtoken'
import z from 'zod'
import { NextRequest, NextResponse } from 'next/server'
import Comment from '@/models/commentModel'

connect()

const dataZ = z.object({
  content: z.string().min(1).max(500),
  postId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const parseResult = dataZ.safeParse(await request.json())
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }
    const { content, postId } = parseResult.data

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // new comment
    await Comment.create({ userId, postId, content })
    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } }) // Increment the comment count

    return NextResponse.json({ status: 200, message: 'Comment added successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
