import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Friend from '@/models/friends'
import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbConfig'

connect()

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await User.findById(tokenData.id)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20', 10)
    const skip = (page - 1) * limit

    const result = await Friend.aggregate([
      {
        $match: {
          $or: [
            { receiver: user._id, status: 'accepted' },
            { sender: user._id, status: 'accepted' },
          ],
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

    const totalCount = result[0].metadata[0] ? result[0].metadata[0].total : 0
    const friends = result[0].data

    const totalPages = Math.ceil(totalCount / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const nextPageUrl = nextPage ? `${request.nextUrl.pathname}?page=${nextPage}&limit=${limit}` : null

    user.friendsCount = totalCount
    await user.save()

    return NextResponse.json(
      {
        friends,
        total: totalCount,
        nextPageUrl,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
