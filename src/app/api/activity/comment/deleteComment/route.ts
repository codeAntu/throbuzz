import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Comment from '@/models/commentModel'
import Post from '@/models/postModel'
import CommentReply from '@/models/commentReplyModel'
import LikeOnComment from '@/models/likeOnCommentModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const { commentId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 })
    }

    const postId = comment.postId

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    if (post.visibility === 'private' && post.userId.toString() !== userId) {
      return NextResponse.json({ error: 'The post is Privet' }, { status: 401 })
    }

    if (comment.userId.toString() !== userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await CommentReply.deleteMany({ commentId })

    await LikeOnComment.deleteMany({ commentId })

    // update the comments count on the post
    post.comments = post.comments - 1
    await post.save()

    // delete the comment
    await Comment.findByIdAndDelete(commentId)

    return NextResponse.json({ message: 'Comment deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
