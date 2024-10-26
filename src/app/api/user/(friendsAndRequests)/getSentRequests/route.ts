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

    const results = await Friend.aggregate([
      {
        $match: {
          sender: user._id,
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
                localField: 'receiver',
                foreignField: '_id',
                as: 'receiverDetails',
              },
            },
            {
              $unwind: '$receiverDetails',
            },
            {
              $project: {
                'receiverDetails.name': 1,
                'receiverDetails.username': 1,
                'receiverDetails.profilePic': 1,
                'receiverDetails.bio': 1,
              },
            },
          ],
        },
      },
    ])

    if (!results.length) {
      return NextResponse.json({ error: 'Friend requests not found' }, { status: 404 })
    }

    console.log(results)

    const totalRequests = results[0].metadata[0]?.total || 0
    const requests = results[0].data

    const totalPages = Math.ceil(totalRequests / limit)
    const hasNextPage = page < totalPages
    const nextPageUrl = hasNextPage ? `${request.nextUrl.pathname}?page=${page + 1}&limit=${limit}` : null

    return NextResponse.json({ sentRequests: requests, nextPageUrl, totalRequests }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
