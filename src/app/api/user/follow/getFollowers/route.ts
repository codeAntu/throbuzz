import { connect } from '@/dbConfig/dbConfig'
import Friend from '@/models/friends'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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
    const result = await Friend.aggregate([
      {
        $match: {
          receiver: user._id,
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
              $unwind: '$senderDetails',
            },
            {
              $project: {
                'senderDetails.name': 1,
                'senderDetails.username': 1,
                'senderDetails.profilePic': 1,
                'senderDetails.bio': 1,
                status: 1,
              },
            },
          ],
        },
      },
    ])

    const totalFollowers = result[0].metadata[0] ? result[0].metadata[0].total : 0
    const followers = result[0].data

    const totalPages = Math.ceil(totalFollowers / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const nextPageUrl = nextPage ? `${request.nextUrl.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json({ followers, nextPageUrl, totalFollowers }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
