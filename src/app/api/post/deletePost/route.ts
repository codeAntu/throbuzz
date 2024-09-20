import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Post from '@/models/postModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        {
          status: 401,
        },
      )
    }

    const post = await Post.findByIdAndDelete(postId)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json({ status: 200, message: 'Post deleted successfully' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 400,
      },
    )
  }
}
