import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/userModel'
import { z } from 'zod'
import { parseJson } from '@/utils/utils'
import Follow from '@/models/follows'

const userName = z
  .object({
    username: z
      .string({ required_error: 'Username is required' }) //
      .trim()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(100, { message: 'Username must be at most 100 characters long' })
      .toLowerCase()
      .optional(),
  })
  .strict()
  .refine((data) => data.username, { message: 'username is required' })

connect()

export async function POST(request: NextRequest) {
  const body = await parseJson(request)
  if (body instanceof NextResponse) return body
  try {
    const { username } = await userName.parse(body)

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    const userId = tokenData.id // Extract user ID from token data

    const follower = await User.findOne({ _id: userId, isVerified: true })

    if (!follower) {
      return NextResponse.json({ error: 'follower not found' }, { status: 404 })
    }

    const following = await User.findOne({ username, isVerified: true })

    if (!following) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const follow = await Follow.deleteOne({ follower: follower._id, following: following._id })

    if (follow.deletedCount === 0) {
      return NextResponse.json({ error: 'You are not following this user' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Unfollowed successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
