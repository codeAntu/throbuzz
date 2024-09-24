import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Comment from '@/models/commentModel' // Ensure Comment model is imported
import CommentReply from '@/models/commentReplyModel'
import Post from '@/models/postModel'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

const dataZ = z.object({
  content: z.string().min(1).max(500),
  commentId: z.string(),
})

connect()

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }
    const { content, commentId } = parseResult.data

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }
    const postId = comment.postId

    const commentReply = new CommentReply({
      userId,
      commentId,
      content,
      postId,
    })

    await commentReply.save()

    await Comment.findByIdAndUpdate(commentId, { $inc: { comments: 1 } }) // Increment the comment count
    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } }) // Increment the comment count

    return NextResponse.json({ message: 'Comment reply added successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
