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

    const statuses = await Status.find({
      user: { $in: followingIds },
      visibility: { $in: ['public', 'friends'] },
      expireAt: { $gt: now },
    })
      .sort({ createdAt: -1 })
      .populate('user', 'name username profileImage')
      .lean()

    // Group statuses by user
    const groupedStatuses = statuses.reduce((acc: any, status: any) => {
      const userId = status.user._id.toString()
      if (!acc[userId]) {
        acc[userId] = {
          user: status.user,
          statuses: [],
        }
      }
      acc[userId].statuses.push(status)
      return acc
    }, {})

    const groupedArray = Object.values(groupedStatuses)

    return NextResponse.json({ groupedStatuses: groupedArray }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
