import { TokenDataT } from '@/lib/types'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import User from '@/models/userModel'
import Friend from '@/models/friends'
import Notification from '@/models/notificationModel'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { friendRequestId } = await parseJson(request)

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const friendRequest = await Friend.findOne({ _id: friendRequestId })

    if (!friendRequest) {
      return NextResponse.json({ error: 'Friend request not found' }, { status: 404 })
    }

    if (friendRequest.status === 'accepted') {
      return NextResponse.json({ error: 'Friend request already accepted' }, { status: 400 })
    }

    if (friendRequest.receiver.toString() !== tokenData.id.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    friendRequest.status = 'accepted'
    await friendRequest.save()

    // notification to sender

    const notification = new Notification({
      userId: friendRequest.sender,
      title: 'Friend Request',
      message: `${friendRequest.receiverUsername} accepted your friend request`,
      read: false,
      readAt: null,
      url: `/user/${friendRequest.receiverUsername}`,
    })

    await notification.save()

    await User.findByIdAndUpdate(friendRequest.sender, {
      $inc: { friendRequestSentCount: -1, friendsCount: 1, newNotificationsCount: 1 },
    })

    await User.findByIdAndUpdate(friendRequest.receiver, {
      $inc: { friendRequestsCount: -1, friendsCount: 1 },
    })

    return NextResponse.json({ message: 'Friend request accepted', friendRequest: friendRequest }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
