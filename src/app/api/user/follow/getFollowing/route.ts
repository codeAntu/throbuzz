import { connect } from '@/dbConfig/dbConfig'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import User from '@/models/userModel'
import Follow from '@/models/follows'
import { TokenDataT } from '@/lib/types'
import jwt from 'jsonwebtoken'

connect()

const userNameValid = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(100, { message: 'Username must be at most 100 characters long' }),
  })
  .strict()

export async function POST(request: NextRequest) {
  const body = await parseJson(request)

  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)
  const skip = (page - 1) * limit

  try {
    const { username } = userNameValid.parse(body)

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT
    const tokenUserId = tokenData?.id

    const user = await User.findOne({ username }).select('_id')
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const result = await Follow.aggregate([
      {
        $match: { follower: user._id },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: 'users',
                localField: 'following',
                foreignField: '_id',
                as: 'details',
              },
            },
            {
              $unwind: '$details',
            },
            {
              $lookup: {
                from: 'follows',
                let: { followingId: '$details._id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: [{ $toString: '$follower' }, { $toString: tokenUserId }] },
                          { $eq: [{ $toString: '$following' }, { $toString: '$$followingId' }] },
                        ],
                      },
                    },
                  },
                ],
                as: 'isFollowing',
              },
            },
            {
              $addFields: {
                isFollowing: {
                  $cond: {
                    if: { $eq: [tokenUserId, null] },
                    then: false,
                    else: { $gt: [{ $size: '$isFollowing' }, 0] },
                  },
                },
                isMe: { $eq: [{ $toString: '$details._id' }, { $toString: tokenUserId }] },
              },
            },
            {
              $project: {
                'details.name': 1,
                'details.username': 1,
                'details.profilePic': 1,
                'details.bio': 1,
                'details._id': 1,
                isFollowing: 1,
                isMe: 1,
              },
            },
          ],
        },
      },
    ])
    const totalFollowing = result[0].metadata[0] ? result[0].metadata[0].total : 0
    const followers = result[0].data

    const totalPages = Math.ceil(totalFollowing / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const nextPageUrl = nextPage ? `${request.nextUrl.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json({ followers, nextPageUrl, totalFollowing }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
