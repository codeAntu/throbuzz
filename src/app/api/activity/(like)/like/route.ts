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

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = tokenData.id

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const like = await Like.findOne({ postId, userId })

    if (like) {
      like.reaction = reaction
      await like.save()
    } else {
      const post = await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }) // Increment the like count
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      await Like.create({ postId, userId, reaction })
    }

    // Send notification to the post owner

    console.log('post.userId', post.userId)

    const notification = new Notification({
      userId: post.userId,
      title: 'Like',
      message: `${tokenData.username} liked your post: "${post.text.slice(0, 20)}..."`,
      read: false,
      readAt: null,
      url: `/post/${postId}`,
    })

    await notification.save()

    return NextResponse.json({ status: 200, message: 'Like added successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
