import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Post from '@/models/postModel'
import User from '@/models/userModel'
import Like from '@/models/likeModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const post = await Post.findOne({ _id: postId })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.visibility === 'private' && (!tokenData || post.userId.toString() !== tokenData.id)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await User.findById(post.userId).select('username name profilePic')
    const isLiked = tokenData ? await Like.exists({ postId: post._id, userId: tokenData.id }) : false

    return NextResponse.json({
      post: {
        ...post.toObject(),
        isLiked: !!isLiked,
        isMine: tokenData ? post.userId.toString() === tokenData.id : false,
      },
      user,
      status: 200,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
