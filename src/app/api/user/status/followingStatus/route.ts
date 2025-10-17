import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Follow from '@/models/follows'
import Status from '@/models/status'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT
    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const followCount = await Follow.countDocuments({ follower: tokenData.id })
    if (followCount === 0) {
      return NextResponse.json({ statuses: [] }, { status: 200 })
    }

    const follows = await Follow.find({ follower: tokenData.id }).select('following').lean()
    const followingIds = follows.map((f) => f.following)
    const now = new Date()

    // Use aggregation pipeline to group statuses by user
    const groupedStatuses = await Status.aggregate([
      {
        $match: {
          user: { $in: followingIds },
          visibility: { $in: ['public', 'friends'] },
          expireAt: { $gt: now },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: '$userInfo',
      },
      {
        $group: {
          _id: '$user',
          user: {
            $first: {
              _id: '$userInfo._id',
              name: '$userInfo.name',
              username: '$userInfo.username',
              profileImage: '$userInfo.profileImage',
            },
          },
          statuses: {
            $push: {
              _id: '$_id',
              text: '$text',
              image: '$image',
              visibility: '$visibility',
              createdAt: '$createdAt',
              expireAt: '$expireAt',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          user: 1,
          statuses: 1,
        },
      },
    ])

    return NextResponse.json({ groupedStatuses }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
