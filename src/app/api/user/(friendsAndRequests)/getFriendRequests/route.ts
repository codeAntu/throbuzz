import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import Friend from '@/models/friends'

connect()

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = await User.findById(tokenData.id)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20', 10)
    const skip = (page - 1) * limit

    const results = await Friend.aggregate([
      {
        $match: {
          receiver: user._id,
          status: 'pending',
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
              },
            },
          ],
        },
      },
    ])

    const total = results[0].metadata[0] ? results[0].metadata[0].total : 0
    const friends = results[0].data

    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const nextPageUrl = hasNextPage ? `${request.nextUrl.pathname}?page=${page + 1}&limit=${limit}` : null

    const newFriendsRequestCount = user.newFriendsRequestCount - friends.length
    user.newFriendsRequestCount = newFriendsRequestCount > 0 ? newFriendsRequestCount : 0
    user.friendRequestsCount = friends.length
    await user.save()

    return NextResponse.json(
      {
        friendRequests: friends,
        total,
        page,
        totalPages,
        nextPage: nextPageUrl,
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}
