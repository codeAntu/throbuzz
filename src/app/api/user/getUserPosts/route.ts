import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Post from '@/models/postModel'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import Like from '@/models/likeModel'

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

    const foundUser = await User.findOne({ username })
    if (!foundUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user: any = {
      username: foundUser.username,
      name: foundUser.name,
      profilePic: foundUser.profilePic.imageUrl,
      isMe: false,
    }

    if (tokenData && tokenData.username === username) {
      user.isMe = true
      query = { userId: tokenData.id }
    } else {
      query = { userId: foundUser._id, visibility: 'public' }
    }

    totalPosts = await Post.countDocuments(query)
    const posts = await Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)

    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        let isLiked = false
        if (tokenData) {
          isLiked = !!(await Like.exists({ postId: post._id, userId: tokenData.id }))
        }
        return {
          ...post.toObject(),
          isLiked,
        }
      }),
    )

    if (tokenData && tokenData.username === username) {
      foundUser.postsCount = totalPosts
      await foundUser.save()
    }

    if (!posts.length) {
      return NextResponse.json({ message: 'No posts found' }, { status: 200 })
    }

    const totalPages = Math.ceil(totalPosts / limit)
    const nextPage = page < totalPages ? page + 1 : null

    return NextResponse.json({ user, posts: postsWithLikes, nextPage }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
