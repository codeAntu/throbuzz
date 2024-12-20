import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Post from '@/models/postModel'
import { parseJson } from '@/utils/utils'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

connect()

const searchZ = z.object({
  search: z.string().trim().toLowerCase().min(3, { message: 'Search must be at least 3 characters long' }).max(100, {
    message: 'Search must be at most 100 characters long',
  }),
})

export async function POST(request: NextRequest) {
  const body = await parseJson(request)

  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)
  const skip = (page - 1) * limit

  try {
    const { search } = searchZ.parse(body)

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const tokenUserId = tokenData ? tokenData.id : null
    console.log('Token User ID:', tokenUserId)

    const posts = await Post.aggregate([
      {
        $match: {
          text: { $regex: search, $options: 'i' },
          visibility: 'public',
        },
      },
      {
        $addFields: {
          daysSinceCreated: {
            $divide: [{ $subtract: [new Date(), '$createdAt'] }, 1000 * 60 * 60 * 24],
          },
        },
      },
      {
        $addFields: {
          popularity: {
            $multiply: [{ $add: ['$likes', '$comments'] }, { $exp: { $multiply: ['$daysSinceCreated', -0.1] } }],
          },
        },
      },
      { $sort: { popularity: -1, createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'author',
          pipeline: [
            {
              $project: {
                name: 1,
                username: 1,
                profilePic: 1,
              },
            },
          ],
        },
      },
      { $unwind: '$author' },
      {
        $lookup: {
          from: 'likes',
          let: { postId: { $toString: '$_id' }, userId: { $toString: tokenUserId } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $toString: '$postId' }, '$$postId'] },
                    { $eq: [{ $toString: '$userId' }, '$$userId'] },
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
      {
        $project: {
          userLikes: 0,
        },
      },
    ])

    console.log('Aggregated posts with isLiked:', posts)

    const total = await Post.countDocuments({
      text: { $regex: search, $options: 'i' },
    })

    console.log('Total matching posts:', total)

    const totalPages = Math.ceil(total / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const nextPageUrl = nextPage ? `${url.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json(
      {
        posts,
        nextPageUrl,
        total,
        totalPages,
      },
      {
        status: 200,
      },
    )
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        error: error.errors,
      },
      {
        status: 400,
      },
    )
  }
}
