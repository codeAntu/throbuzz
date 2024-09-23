import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Comment from '@/models/commentModel'
import Post from '@/models/postModel'
import CommentReply from '@/models/commentReplyModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const { commentId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const comment = await Comment.findOneAndDelete({ _id: commentId, userId })

    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 })
    }

    const postId = comment.postId

    // delete all the comment replies on that comment

    await CommentReply.deleteMany({ commentId })

    // update the comments count on the post
    await Post.findByIdAndUpdate(postId, { $inc: { comments: -(comment.comments + 1) } })

    return NextResponse.json({ message: 'Comment deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}