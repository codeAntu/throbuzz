import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Post from '@/models/postModel'
import Like from '@/models/likeModel'
import LikeOnComment from '@/models/likeOnCommentModel'
import Comment from '@/models/commentModel'
import LikeOnCommentReply from '@/models/likeOnCommentReply'
import CommentReply from '@/models/commentReplyModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    console.log('postId', postId)

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const post = await Post.findOne({ _id: postId })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.userId.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // delete all the likes on the comment
    await Like.deleteMany({ postId })

    // delete all the likes on the comments om the post
    await LikeOnComment.deleteMany({ postId })

    // delete all the likes on the comments replies
    await LikeOnCommentReply.deleteMany({ postId })

    // delete all the comments replies on the comment on the post
    await CommentReply.deleteMany({ postId })

    // delete all the comments on the post
    await Comment.deleteMany({ postId })

    // delete the post
    await Post.deleteOne({ _id: postId })

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
