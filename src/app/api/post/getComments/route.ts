import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Comment from '@/models/commentModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import LikeOnComment from '@/models/likeOnCommentModel'
import Post from '@/models/postModel'
import { ObjectId } from 'mongodb'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT | null

    const tokenUserId = tokenData ? tokenData.id : null

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit

    const post = await Post.findById(postId)

    // if (!post) {
    //   return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    // }

    // if (post.visibility === 'private' && (!tokenData || post.userId.toString() !== tokenData.id)) {
    //   return NextResponse.json({ error: 'Post is private' }, { status: 403 })
    // }

    // console.log('post', post)

    const commentsAggregation = await Comment.aggregate([
      { $match: { postId: new ObjectId(postId) } },
      {
        $facet: {
          comments: [
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
                      from: 'likeoncomments',
                      let: { commentId: '$_id', postId: '$postId' },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $and: [
                                { $eq: ['$commentId', '$$commentId'] },
                                { $eq: ['$postId', '$$postId'] },
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
                postId: 1,
                userId: 1,
                content: 1,
                likes: 1,
                comments: 1,
                isLiked: 1,
                createdAt: 1,
              },
            },
          ],
          totalComments: [{ $count: 'count' }],
        },
      },
      {
        $project: {
          comments: 1,
          totalComments: { $arrayElemAt: ['$totalComments.count', 0] },
        },
      },
    ])

    const nextPage = commentsAggregation[0].comments.length === limit ? page + 1 : null
    const nextLink = nextPage ? `${url.origin}${url.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json(
      {
        comments: commentsAggregation[0].comments,
        totalComments: commentsAggregation[0].totalComments || 0,
        nextPage,
        nextLink,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
