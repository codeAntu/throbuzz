import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import CommentReply from '@/models/commentReplyModel'
import Comment from '@/models/commentModel'
import Post from '@/models/postModel'

connect()

const dataZ = z.object({
  commentReplyId: z.string().nonempty(),
})

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { commentReplyId } = parseResult.data

    const commentReply = await CommentReply.findById(commentReplyId)

    if (!commentReply) {
      return NextResponse.json({ error: 'Comment reply not found' }, { status: 404 })
    }

    console.log(commentReply.userId.toString())

    if (commentReply.userId.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const commentId = commentReply.commentId

    const comment = await Comment.findByIdAndUpdate(commentId, { $inc: { comments: -1 } })
    const postId = comment?.postId
    await Post.findByIdAndUpdate(postId, { $inc: { comments: -1 } }) // Increment the comment count

    //  delete the comment reply

    await CommentReply.findByIdAndDelete(commentReplyId)

    return NextResponse.json({ message: 'Comment reply deleted successfully', commentReply }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
