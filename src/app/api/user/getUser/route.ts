import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Friend, { FriendT } from '@/models/friends'

connect()

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username } = await req.json()

    const searchBy = username.trim().toLowerCase()

    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const user = await User.findOne({ username: searchBy, isVerified: true })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let friendStatus = ''
    if (!(tokenData.id === user._id.toString())) {
      const friendExists = await Friend.findOne({
        sender: tokenData.id,
        receiver: user._id,
      })

      if (friendExists) {
        friendStatus = friendExists.status
      }
    }

    const resUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic.imageUrl,
      followers: user.friendsCount + user.friendRequestsCount,
      following: user.friendsCount + user.friendRequestSentCount,
      posts: user.postsCount,
      isMe: tokenData.id === user._id.toString(),
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
    return NextResponse.json({ error: error.response.data }, { status: 400 })
  }
}
