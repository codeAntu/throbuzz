import { TokenDataT } from '@/lib/types'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import Follow from '@/models/follows'
import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbConfig'

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

    let tokenUserId = null

    if (tokenData) {
      const extUser = await User.findById(tokenData.id)
      tokenUserId = extUser?._id || null
    }

    const users = await User.aggregate([
      {
        $match: {
          $or: [
            { username: { $regex: search, $options: 'i' }, isVerified: true },
            { name: { $regex: search, $options: 'i' }, isVerified: true },
          ],
        },
      },
      {
        $addFields: {
          totalCount: { $add: ['$followers', '$postsCount'] },
        },
      },
      { $sort: { totalCount: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'follows',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$follower', tokenUserId] }, { $eq: ['$following', '$$userId'] }],
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
        },
      },
      {
        $project: {
          name: 1,
          username: 1,
          profilePic: 1,
          isFollowing: 1,
          followers: 1,
          postsCount: 1,
          isMe: { $eq: ['$_id', tokenUserId] },
        },
      },
    ])

    const totalUsers = await User.countDocuments({
      $or: [{ username: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }],
    })

    const totalPages = Math.ceil(totalUsers / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const nextPageUrl = nextPage ? `${request.nextUrl.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json({ users, nextPageUrl, totalUsers }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
