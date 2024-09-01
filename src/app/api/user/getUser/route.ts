import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

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

    const resUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      about: user.about,
      profilePic: user.profilePic.imageUrl,
      coverPic: user.coverPic.imageUrl,
      followers: user.followers,
      following: user.following,
      isMe: tokenData.id === user._id.toString(),
    }

    return NextResponse.json({ user: resUser }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.response.data }, { status: 400 })
  }
}
