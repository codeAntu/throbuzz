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

    let tokenUserId = String(tokenData?.id || '')

    console.log('tokenUserId:', tokenUserId)

    const following = tokenUserId ? await Follow.find({ follower: tokenUserId }).select('following') : []
    const followingIds = following.map((f) => String(f.following))

    const users = await User.aggregate([
      { $addFields: { score: { $add: ['$postsCount', '$followers'] }, _id: { $toString: '$_id' } } },
      {
        $match: {
          $and: [{ isVerified: true }, tokenUserId ? { _id: { $nin: followingIds, $ne: tokenUserId } } : {}],
        },
      },
      { $sort: { score: -1 } },
      { $skip: skip },
      { $limit: limit },
    ])

    // const users = await User.aggregate([
    //   { $addFields: { score: { $add: ['$postsCount', '$followers'] }, _id: { $toString: '$_id' } } },
    //   {
    //     $lookup: {
    //       from: 'follows',
    //       let: { userId: '$_id' },
    //       pipeline: [
    //         { $match: { $expr: { $and: [{ $eq: ['$follower', tokenUserId] }, { $eq: ['$following', '$$userId'] }] } } },
    //         { $project: { _id: 1 } },
    //       ],
    //       as: 'isFollowing',
    //     },
    //   },
    //   {
    //     $match: {
    //       $and: [{ isVerified: true }, tokenUserId ? { isFollowing: { $eq: [] }, _id: { $ne: tokenUserId } } : {}],
    //     },
    //   },
    //   { $sort: { score: -1 } },
    //   { $skip: skip },
    //   { $limit: limit },
    // ])

    return NextResponse.json({ users }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
