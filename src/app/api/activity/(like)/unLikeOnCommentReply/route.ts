import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import CommentReply from '@/models/commentReplyModel'
import LikeOnCommentReply from '@/models/likeOnCommentReply'
import Post from '@/models/postModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

connect()

const dataZ = z.object({
  likeOnCommentReplyId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { likeOnCommentReplyId } = parseResult.data

    const likeOnCommentReply = await LikeOnCommentReply.findById(likeOnCommentReplyId)

    if (!likeOnCommentReply) {
      return NextResponse.json({ error: 'Like on Comment Reply not found' }, { status: 404 })
    }

    const post = await Post.findById(likeOnCommentReply.postId)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.visibility === 'private' && post.userId.toString() !== userId) {
      return NextResponse.json({ error: 'The post is private' }, { status: 401 })
    }

    if (likeOnCommentReply.userId.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const commentReply = await CommentReply.findByIdAndUpdate(likeOnCommentReply.commentReplyId, {
      $inc: { likes: -1 },
    }) // Decrement the like count

    await likeOnCommentReply.deleteOne()

    return NextResponse.json({ status: 200, message: 'Like on Comment Reply removed successfully' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 400,
      },
    )
  }
}
