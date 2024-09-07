import { TokenDataT } from '@/lib/types'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Friend from '@/models/friends'

export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const { friendRequestId } = await parseJson(request)
    console.log('friendRequestId', friendRequestId)

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

    const deletedFriendRequest = {
      _id: friendRequest._id,
      sender: friendRequest.sender,
      receiver: friendRequest.receiver,
    }

    await friendRequest.deleteOne()

    return NextResponse.json(
      { message: 'Friend request deleted', deletedFriendRequest: deletedFriendRequest },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
