import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/userModel'
import Friend from '@/models/friends'
import { z } from 'zod'
import { parseJson } from '@/utils/utils'

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

    const sender = await User.findOne({ _id: tokenData.id, isVerified: true })

    if (!sender) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const receiver = await User.findOne({ username, isVerified: true })

    if (!receiver) {
      return NextResponse.json({ error: 'Receiver not found' }, { status: 404 })
    }

    console.log('sender', sender)
    console.log('receiver', receiver)

    if (sender.username === receiver.username) {
      return NextResponse.json({ error: 'You cannot send friend request to yourself' }, { status: 400 })
    }

    // check if friend request already exists

    const friendExists = await Friend.findOne({
      sender: sender._id,
      receiver: receiver._id,
    })

    if (friendExists?.status === 'pending') {
      return NextResponse.json({ error: 'Friend request already sent' }, { status: 400 })
    }

    if (friendExists?.status === 'accepted') {
      return NextResponse.json({ error: 'You are already friends' }, { status: 400 })
    }

    // update sender friend request count

    await User.findByIdAndUpdate(sender._id, { $inc: { friendRequestSentCount: 1 } })

    // update receiver friend request count

    await User.findByIdAndUpdate(receiver._id, { $inc: { friendRequestsCount: 1 } })

    const newFriend = new Friend({
      sender: sender._id,
      senderUsername: sender.username,
      receiver: receiver._id,
      receiverUsername: receiver.username,
      status: 'pending',
    })

    await newFriend.save()

    return NextResponse.json(
      {
        message: 'Friend request sent',
        sender: sender.username,
        receiver: receiver.username,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
