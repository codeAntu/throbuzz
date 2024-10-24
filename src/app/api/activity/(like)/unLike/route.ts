import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Like from '@/models/likeModel'
import Post from '@/models/postModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

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
      return NextResponse.json({ error: 'The post id Privet' }, { status: 401 })
    }

    const like = await Like.findOne({ postId })

    if (!like) {
      return NextResponse.json({ error: 'Like not found' }, { status: 404 })
    }

    if (like.userId.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await Like.findByIdAndDelete(like._id)

    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } })

    return NextResponse.json({ status: 200, message: 'Like deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
