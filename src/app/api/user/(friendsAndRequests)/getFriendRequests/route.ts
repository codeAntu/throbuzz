import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import Friend from '@/models/friends'

connect()

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = await User.findOne({ _id: tokenData.id })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Extract page and limit from query parameters, defaulting to 1 and 20 respectively
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20', 10)
    const skip = (page - 1) * limit

    // Count total pending friend requests
    const total = await Friend.countDocuments({
      receiver: user._id,
      status: 'pending',
    })

    // Fetch paginated list of friend requests
    const friends = await Friend.find({
      receiver: user._id,
      status: 'pending',
    })
      .skip(skip)
      .limit(limit)
      .populate('sender') // Assuming 'sender' is the field that references the User who sent the request
      .exec()

    return NextResponse.json(
      {
        friends,
        total,
        page,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
