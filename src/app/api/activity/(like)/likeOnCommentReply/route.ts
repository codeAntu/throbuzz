import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import CommentReply from '@/models/commentReplyModel'
import LikeOnCommentReply from '@/models/likeOnCommentReply'
import Notification from '@/models/notificationModel'
import Post from '@/models/postModel'

connect()

const dataZ = z.object({
  commentReplyId: z.string().min(1, 'CommentReplyId is required'),
  reaction: z.string().min(1, 'Reaction is required'),
})

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { commentReplyId, reaction } = parseResult.data

    const comment = await CommentReply.findById(commentReplyId)

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    const postId = comment.postId

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.visibility === 'private' && post.userId.toString() !== userId) {
      return NextResponse.json({ error: 'The post is private' }, { status: 401 })
    }

    const like = await LikeOnCommentReply.findOne({ commentReplyId, userId })

    if (like) {
      like.reaction = reaction
      await like.save()
      console.log('Like updated')
    } else {
      const comment = await CommentReply.findByIdAndUpdate(commentReplyId, { $inc: { likes: 1 } }) // Increment the like count

      if (!comment) {
        return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
      }

      const likeOnComment = new LikeOnCommentReply({ userId, reaction, commentReplyId, postId: comment.postId })

      await likeOnComment.save()
    }

    // Send notification to the comment owner

    const notification = new Notification({
      userId: comment.userId,
      title: 'Comment Reply Like',
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
