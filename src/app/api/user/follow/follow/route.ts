import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/userModel'
import { z } from 'zod'
import { parseJson } from '@/utils/utils'
import Follow from '@/models/follows'
import Notification from '@/models/notificationModel'

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

    console.log(id)

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!id) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    const userId = tokenData.id // Extract user ID from token data

    const [follower, following, follow] = await Promise.all([
      User.findById(userId),
      User.findById(id),
      Follow.findOne({ follower: userId, following: id }),
    ])

    if (!follower || !follower.isVerified) {
      return NextResponse.json({ error: 'User 1 not found or not verified' }, { status: 404 })
    }

    if (!following || !following.isVerified) {
      return NextResponse.json({ error: 'User 2 not found or not verified' }, { status: 404 })
    }

    if (follow) {
      return NextResponse.json({ error: 'Already following' }, { status: 400 })
    }

    const newFollow = await Follow.create({ follower: follower._id, following: following._id })

    if (!newFollow) {
      return NextResponse.json({ error: 'Failed to follow' }, { status: 400 })
    }

    follower.following += 1
    following.followers += 1

    await Promise.all([follower.save(), following.save()])

    const notification = new Notification({
      userId: following._id,
      title: 'Follow',
      message: `${follower.username} followed you`,
      read: false,
      readAt: null,
      url: `/user/${follower.username}`,
    })

    await notification.save()

    return NextResponse.json({ message: 'Followed' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
