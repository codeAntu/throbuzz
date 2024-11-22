import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Follow from '@/models/follows'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import jwt from 'jsonwebtoken'
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
  if (body instanceof NextResponse) return body

  try {
    const { username } = userNameValid.parse(body)
    const searchBy = username.trim().toLowerCase()

    const token = request.cookies.get('token')?.value || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const tokenUserId = tokenData?.id

    const userAggregation = await User.aggregate([
      { $match: { username: searchBy, isVerified: true } },
      {
        $lookup: {
          from: 'follows',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $toString: '$follower' }, { $toString: tokenUserId }] },
                    { $eq: [{ $toString: '$following' }, { $toString: '$$userId' }] },
                  ],
                },
              },
              // $match: { $expr: { $and: [{ $eq: ['$following', '$$userId'] }, { $eq: ['$follower', tokenData?.id] }] } },
            },

            // { $limit: 1 },
          ],
          as: 'isFollowing',
        },
      },
      // { $unwind: { path: '$isFollowing', preserveNullAndEmptyArrays: true } },
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
          _id: 1,
          name: 1,
          username: 1,
          bio: 1,
          profilePic: 1,
          followers: 1,
          following: 1,
          postsCount: 1,
          email: 1,
          phone: 1,
          location: 1,
          instagram: 1,
          twitter: 1,
          github: 1,
          linkedin: 1,
          website: 1,
          birthday: 1,
          isFollowing: 1,
        },
      },
    ])

    if (!userAggregation.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = userAggregation[0]
    const resUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
      followers: user.followers,
      following: user.following,
      posts: user.postsCount,
      isMe: token ? tokenData.id === user._id.toString() : false,
      isFollowing: user.isFollowing > 0,
      about: {
        email: user.email,
        phone: user.phone,
        mapPin: user.location,
        instagram: user.instagram,
        twitter: user.twitter,
        github: user.github,
        linkedin: user.linkedin,
        website: user.website,
        dob: user.birthday,
      },
    }

    return NextResponse.json({ user: resUser }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 400 })
  }
}
