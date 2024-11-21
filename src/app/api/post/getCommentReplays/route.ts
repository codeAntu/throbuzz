// import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import CommentReply from '@/models/commentReplyModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import LikeOnCommentReply from '@/models/likeOnCommentReply'
import { ObjectId } from 'mongodb'
import { connect } from '@/dbConfig/dbConfig'

connect()

export async function POST(request: NextRequest) {
  try {
    const { commentId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT | null

    const tokenUserId = tokenData ? tokenData.id : null

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '5', 10)
    const skip = (page - 1) * limit

    const commentReplaysAggregation = await CommentReply.aggregate([
      { $match: { commentId: new ObjectId(commentId) } },
      {
        $facet: {
          commentReplays: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
              },
            },
            { $unwind: '$user' },
            ...(tokenUserId
              ? [
                  {
                    $lookup: {
                      from: 'likeoncommentreplies',
                      let: { commentReplyId: '$_id', commentId: '$commentId' },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $and: [
                                { $eq: ['$commentReplyId', '$$commentReplyId'] },
                                // { $eq: ['$commentId', '$$commentId'] },
                                { $eq: ['$userId', new ObjectId(tokenUserId)] },
                              ],
                            },
                          },
                        },
                      ],
                      as: 'userLikes',
                    },
                  },
                  {
                    $addFields: {
                      isLiked: { $gt: [{ $size: '$userLikes' }, 0] },
                    },
                  },
                ]
              : [
                  {
                    $addFields: {
                      isLiked: false,
                    },
                  },
                ]),
            {
              $project: {
                'user.profilePic': 1,
                'user.username': 1,
                'user.name': 1,
                'user._id': 1,
                commentId: 1,
                userId: 1,
                content: 1,
                likes: 1,
                isLiked: 1,
                createdAt: 1,
              },
            },
          ],
          totalCommentReplays: [{ $count: 'count' }],
        },
      },
      {
        $project: {
          commentReplays: 1,
          totalCommentReplays: { $arrayElemAt: ['$totalCommentReplays.count', 0] },
        },
      },
    ])

    const nextPage = commentReplaysAggregation[0].commentReplays.length === limit ? page + 1 : null
    const nextLink = nextPage ? `${url.origin}${url.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json(
      {
        commentReplays: commentReplaysAggregation[0].commentReplays,
        totalCommentReplays: commentReplaysAggregation[0].totalCommentReplays || 0,
        nextPage,
        nextLink,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
