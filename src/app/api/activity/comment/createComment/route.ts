import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Post from '@/models/postModel'
import jwt from 'jsonwebtoken'
import z from 'zod'
import { NextRequest, NextResponse } from 'next/server'
import Comment from '@/models/commentModel'
import Notification from '@/models/notificationModel'

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

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.visibility === 'private' && post.userId.toString() !== userId) {
      return NextResponse.json({ error: 'The post is Privet' }, { status: 401 })
    }

    // new comment
    const comment = await Comment.create({ userId, postId, content })
    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } }) // Increment the comment count

    // Send notification to the post owner

    const notification = new Notification({
      userId: post.userId,
      title: 'Comment',
      message: `${tokenData.username} commented on your post : "${post.text.slice(0, 20)}..."`,
      read: false,
      readAt: null,
      url: `/post/${postId}`,
    })

    await notification.save()

    return NextResponse.json(
      {
        message: 'Comment created successfully',
        comment,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
