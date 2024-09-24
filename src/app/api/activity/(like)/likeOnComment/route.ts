import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import LikeOnComment from '@/models/likeOnCommentModel'
import Comment from '@/models/commentModel'
import Notification from '@/models/notificationModel'

connect()

const dataZ = z.object({
  commentId: z.string(),
  reaction: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { commentId, reaction } = parseResult.data

    const userId = tokenData.id

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    const like = await LikeOnComment.findOne({ commentId, userId })

    if (like) {
      like.reaction = reaction
      await like.save()
      console.log('Like updated')
    } else {
      const comment = await Comment.findByIdAndUpdate(commentId, { $inc: { likes: 1 } }) // Increment the like count
      if (!comment) {
        return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
      }
      console.log('Like added')

      const likeOnComment = new LikeOnComment({ userId, reaction, commentId, postId: comment.postId })
      await likeOnComment.save()
    }

    // Send notification to the comment owner

    const notification = new Notification({
      userId: comment.userId,
      title: 'Like',
      message: `${tokenData.username} liked your comment: "${comment.content.slice(0, 20)}..."`,
      read: false,
      readAt: null,
      url: `/post/${comment.postId}`,
    })

    return NextResponse.json({ status: 200, message: 'Like added successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}