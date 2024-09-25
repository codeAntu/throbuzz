import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import CommentReply from '@/models/commentReplyModel'
import Post from '@/models/postModel'

connect()

const dataZ = z.object({
  content: z.string().min(1).max(500),
  commentReplyId: z.string(),
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

    const { content, commentReplyId } = parseResult.data

    const commentReply = await CommentReply.findById(commentReplyId)

    if (!commentReply) {
      return NextResponse.json({ error: 'Comment reply not found' }, { status: 404 })
    }

    const postId = commentReply.postId

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.visibility === 'private' && post.userId.toString() !== userId) {
      return NextResponse.json({ error: 'The post is private' }, { status: 401 })
    }

    if (commentReply.userId.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    commentReply.content = content
    await commentReply.save()

    return NextResponse.json({ message: 'Comment reply updated successfully', commentReply }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
