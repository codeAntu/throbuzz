import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/userModel'
import { z } from 'zod'
import { parseJson } from '@/utils/utils'
import Follow from '@/models/follows'

const data = z
  .object({
    id: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(100, { message: 'Username must be at most 100 characters long' })
      .trim(),
  })
  .refine((data) => data.id !== '', { message: 'Username is required' })

connect()

export async function POST(request: NextRequest) {
  const body = await parseJson(request)
  if (body instanceof NextResponse) return body

  try {
    const { id } = await data.parse(body)
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id
    const follower = await User.findById(userId)
    const following = await User.findById(id)

    if (!follower || !follower.isVerified) {
      return NextResponse.json({ error: 'User not found or not verified' }, { status: 404 })
    }

    if (!following || !following.isVerified) {
      return NextResponse.json({ error: 'User not found or not verified' }, { status: 404 })
    }

    const follow = await Follow.deleteOne({ follower: follower._id, following: following._id })

    if (follow.deletedCount === 0) {
      return NextResponse.json({ error: 'You are not following this user' }, { status: 400 })
    }

    follower.following -= 1
    following.followers -= 1

    await follower.save()
    await following.save()

    return NextResponse.json({ message: 'Unfollowed successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
