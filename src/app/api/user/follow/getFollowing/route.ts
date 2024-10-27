import { connect } from '@/dbConfig/dbConfig'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Friend from '@/models/friends'
import User from '@/models/userModel'

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
    const user = await User.findOne({ username }).select('_id')
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log(user)

    const result = await Friend.aggregate([
      {
        $match: {
          $or: [{ sender: user._id }, { receiver: user._id, status: 'accepted' }],
        },
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
                localField: 'sender',
                foreignField: '_id',
                as: 'senderDetails',
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'receiver',
                foreignField: '_id',
                as: 'receiverDetails',
              },
            },
            {
              $addFields: {
                details: {
                  $cond: {
                    if: { $eq: ['$sender', user._id] },
                    then: { $arrayElemAt: ['$receiverDetails', 0] },
                    else: { $arrayElemAt: ['$senderDetails', 0] },
                  },
                },
              },
            },
            {
              $project: {
                'details.name': 1,
                'details.username': 1,
                'details.profilePic': 1,
                'details.bio': 1,
                status: 1, // Include the status field
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
