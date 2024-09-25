import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Comment from '@/models/commentModel'
import LikeOnComment from '@/models/likeOnCommentModel'
import Post from '@/models/postModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

connect()

const dataZ = z.object({
  likeOnCommentId: z.string(),
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

    const { likeOnCommentId } = parseResult.data

    const likeOnComment = await LikeOnComment.findById(likeOnCommentId)

    if (!likeOnComment) {
      return NextResponse.json({ error: 'Like on Comment not found' }, { status: 404 })
    }

    const post = await Post.findById(likeOnComment.postId)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.visibility === 'private' && post.userId.toString() !== userId) {
      return NextResponse.json({ error: 'The post is private' }, { status: 401 })
    }

    if (likeOnComment.userId.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const comment = await Comment.findByIdAndUpdate(likeOnComment.commentId, { $inc: { likes: -1 } }) // Decrement the like count

    await likeOnComment.deleteOne()

    return NextResponse.json({ status: 200, message: 'Like on Comment removed successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
