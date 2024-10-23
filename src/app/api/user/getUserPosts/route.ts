import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Post from '@/models/postModel'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

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

export async function POST(request: NextRequest, response: NextResponse) {
  console.log('GET /api/user/getUserPosts')

  const body = await parseJson(request)
  if (body instanceof NextResponse) return body

  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = 10
  const skip = (page - 1) * limit

  try {
    const { username } = userNameValid.parse(body)
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    let query = {}
    let totalPosts = 0
    let user = null

    console.log(tokenData)

    if (tokenData && tokenData.username === username) {
      const foundUser = await User.findById(tokenData.id).select('username name profilePic')
      if (!foundUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      user = {
        username: foundUser.username,
        name: foundUser.name,
        profilePic: foundUser.profilePic.imageUrl,
      }
      query = { userId: tokenData.id }
    } else {
      const foundUser = await User.findOne({ username }).select('username name profilePic')
      if (!foundUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      user = {
        username: foundUser.username,
        name: foundUser.name,
        profilePic: foundUser.profilePic.imageUrl,
      }
      query = { userId: foundUser._id, visibility: 'public' }
    }

    totalPosts = await Post.countDocuments(query)
    const posts = await Post.find(query).skip(skip).limit(limit)

    if (!posts.length) {
      return NextResponse.json({ message: 'No posts found' }, { status: 200 })
    }

    const totalPages = Math.ceil(totalPosts / limit)
    const nextPage = page < totalPages ? page + 1 : null

    return NextResponse.json({ user, posts, nextPage }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
