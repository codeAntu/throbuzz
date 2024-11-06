import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Comment from '@/models/commentModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import LikeOnComment from '@/models/likeOnCommentModel'
import Post from '@/models/postModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.visibility && (!tokenData || post.userId.toString() !== tokenData.id)) {
      return NextResponse.json({ error: 'Post is private' }, { status: 403 })
    }

    const comments = await Comment.find({ postId })
      .populate({
        path: 'userId',
        select: 'name profilePic username _id',
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    if (!comments.length) {
      return NextResponse.json({ comments: [], totalComments: 0, nextPage: null, nextLink: null }, { status: 200 })
    }

    const commentsWithLikes = await Promise.all(
      comments.map(async (comment) => {
        const likes = await LikeOnComment.find({ commentId: comment._id })
        const isLiked = tokenData ? likes.some((like) => like.userId.toString() === tokenData.id) : false
        return {
          ...comment.toObject(),
          isLiked,
        }
      }),
    )

    const totalComments = await Comment.countDocuments({ postId })
    const totalPages = Math.ceil(totalComments / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const nextLink = nextPage ? `${url.origin}${url.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json(
      { comments: commentsWithLikes, totalComments: post.comments, nextPage, nextLink },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
