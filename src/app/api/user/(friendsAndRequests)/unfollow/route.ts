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

    if (sender.username === receiver.username) {
      return NextResponse.json({ error: 'You cannot send friend request to yourself' }, { status: 400 })
    }

    const friendRequest = await Friend.findOne({
      $or: [
        { sender: sender._id, receiver: receiver._id },
        { sender: receiver._id, receiver: sender._id },
      ],
    })

    console.log(friendRequest)

    if (!friendRequest) {
      return NextResponse.json({ error: 'Friend request not found' }, { status: 404 })
    }

    if (friendRequest.status === 'accepted') {
      friendRequest.status = 'pending'
      sender.friendsCount -= 1
      receiver.friendsCount -= 1
      friendRequest.sender = receiver._id as any
      friendRequest.receiver = sender._id as any
      receiver.friendRequestSentCount += 1
      sender.friendRequestsCount += 1
      await friendRequest.save()
    }
    if (friendRequest.status === 'pending') {
      // update sender friend request count
      if (friendRequest.sender.toString() === sender._id.toString()) {
        sender.friendRequestSentCount -= 1
        receiver.friendRequestsCount -= 1
      } else {
        sender.friendRequestsCount -= 1
        receiver.friendRequestSentCount -= 1
      }
      await Friend.findByIdAndDelete(friendRequest._id)
    }

    await sender.save()
    await receiver.save()

    // deleteRequest

    return NextResponse.json({ message: 'Friend request deleted' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
