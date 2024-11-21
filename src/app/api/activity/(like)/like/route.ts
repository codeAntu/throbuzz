import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Like from '@/models/likeModel'
import Notification from '@/models/notificationModel'
import Post from '@/models/postModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId, reaction } = await request.json()
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

    const like = await Like.findOne({ postId, userId })
    if (like) {
      like.reaction = reaction
      await like.save()
    } else {
      post.likes += 1
      const updatedPost = await post.save()
      if (!updatedPost) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      await Like.create({ postId, userId, reaction })
    }

    if (post.userId.toString() !== userId) {
      const notification = new Notification({
        userId: post.userId,
        title: 'Like',
        message: `${tokenData.username} liked your post: "${post.text.slice(0, 20)}..."`,
        read: false,
        readAt: null,
        url: `/post/${postId}`,
      })

      await notification.save()
    }

    return NextResponse.json({ status: 200, message: 'Like added successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
