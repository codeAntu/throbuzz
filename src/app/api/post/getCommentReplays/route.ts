import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import CommentReply from '@/models/commentReplyModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import LikeOnCommentReply from '@/models/likeOnCommentReply'

connect()

export async function POST(request: NextRequest) {
  try {
    const { commentId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '5', 10)
    const skip = (page - 1) * limit

    const commentReplays = await CommentReply.find({ commentId })
      .populate({
        path: 'userId',
        select: 'name profilePic',
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    if (!commentReplays.length) {
      return NextResponse.json(
        { commentReplays: [], totalCommentReplays: 0, nextPage: null, nextLink: null },
        { status: 200 },
      )
    }

    const commentReplaysWithLikes = await Promise.all(
      commentReplays.map(async (commentReply) => {
        const likes = await LikeOnCommentReply.find({ commentReplyId: commentReply._id })
        const isLiked = tokenData ? likes.some((like) => like.userId.toString() === tokenData.id) : false
        return {
          ...commentReply.toObject(),
          isLiked,
        }
      }),
    )

    const totalCommentReplays = await CommentReply.countDocuments({ commentId })
    const totalPages = Math.ceil(totalCommentReplays / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const nextLink = nextPage ? `${url.origin}${url.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json(
      { commentReplays: commentReplaysWithLikes, totalCommentReplays, nextPage, nextLink },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
