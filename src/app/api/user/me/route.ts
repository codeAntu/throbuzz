import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(req: NextRequest) {
  try {
    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = await User.findOne({ _id: tokenData.id, isVerified: true })

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
    }

    return NextResponse.json({ user: resUser }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
