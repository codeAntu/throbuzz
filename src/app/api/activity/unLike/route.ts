import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Like from '@/models/likeModule'
import Post from '@/models/postModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

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

    const like = await Like.findOneAndDelete({ postId, userId })

    if (!like) {
      return NextResponse.json({ error: 'Like not found' }, { status: 404 })
    }

    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } })

    return NextResponse.json({ status: 200, message: 'Post deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
