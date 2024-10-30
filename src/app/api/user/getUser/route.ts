import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Follow from '@/models/follows'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import { request } from 'http'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

connect()

const userNameValid = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(100, { message: 'Username must be at most 100 characters long' }),
  })
  .strict()

export async function POST(request: NextRequest, result: NextResponse) {
  const body = await parseJson(request)
  if (body instanceof NextResponse) return body
  try {
    const { username } = userNameValid.parse(body)

    const searchBy = username.trim().toLowerCase()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const user = await User.findOne({ username: searchBy, isVerified: true })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let isFollowing = false

    if (token) {
      const currentUserId = tokenData.id
      const following = await Follow.findOne({ follower: currentUserId, following: user._id })

      if (following) {
        isFollowing = true
      }
    }

    const resUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
      followers: user.followers,
      following: user.following,
      posts: user.postsCount,
      isMe: token ? tokenData.id === user._id.toString() : false,
      isFollowing,
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

    return NextResponse.json({ user: resUser, isFollowing }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.response.data }, { status: 400 })
  }
}
