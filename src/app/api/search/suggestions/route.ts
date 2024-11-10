import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/userModel'
import Follow from '@/models/follows'

connect()

export async function POST(request: NextRequest) {
  const body = await request.body

  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)
  const skip = (page - 1) * limit

  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    let tokenUserId = tokenData?.id || null

    let users
    if (tokenUserId) {
      const following = await Follow.find({ follower: tokenUserId }).select('following')
      const followingIds = following.map((f) => f.following)

      users = await User.aggregate([
        { $match: { _id: { $nin: followingIds, $ne: tokenUserId }, isVerified: true } },
        { $addFields: { score: { $add: ['$postsCount', '$followers'] } } },
        { $sort: { score: -1 } },
        { $skip: skip },
        { $limit: limit },
      ])
    } else {
      users = await User.aggregate([
        { $addFields: { score: { $add: ['$postsCount', '$followers'] } } },
        { $sort: { score: -1 } },
        { $skip: skip },
        { $limit: limit },
      ])
    }

    return NextResponse.json({ users }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
