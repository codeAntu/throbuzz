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
  replyTo: z.string().min(3).max(50),
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
    const { content, commentId, replyTo } = parseResult.data

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    const postId = comment.postId

    console.log('commentId', commentId)
    console.log('postId', postId)
    console.log('userId', userId)
    console.log('content', content)
    console.log('replyTo', replyTo)

    const user = await User.findOne({ username: replyTo, verified: true })
    console.log('user', user)

    const newCommentReply = new CommentReply({
      user: userId,
      postId,
      commentId,
      content,
      replyTo,
    })

    await newCommentReply.save()

    await Comment.findByIdAndUpdate(commentId, { $inc: { comments: 1 } }) // Increment the comment count
    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } }) // Increment the comment count

    return NextResponse.json({ message: 'Comment reply added successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
