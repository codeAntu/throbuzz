import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import LikeOnComment from '@/models/likeOnCommentModel'
import Comment from '@/models/commentModel'
import Notification from '@/models/notificationModel'
import Post from '@/models/postModel'

connect()

const dataZ = z.object({
  commentId: z.string(),
  reaction: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
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
      console.log('Like added')

      const likeOnComment = new LikeOnComment({ userId, reaction, commentId, postId: comment.postId })
      await likeOnComment.save()
      comment.likes += 1
      await comment.save()
      if (!comment) {
        return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
      }
    }

    if (comment.userId.toString() !== userId) {
      const notification = new Notification({
        userId: comment.userId,
        title: 'Like',
        message: `${tokenData.username} liked your comment: "${comment.content.slice(0, 20)}..."`,
        read: false,
        readAt: null,
        url: `/post/${comment.postId}`,
      })

      await notification.save()
    }

    return NextResponse.json({ status: 200, message: 'Like added successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
