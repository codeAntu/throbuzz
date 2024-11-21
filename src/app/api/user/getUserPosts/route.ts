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
  const limit = 20
  const skip = (page - 1) * limit

  try {
    const { username } = userNameValid.parse(body)
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const foundUser = await User.aggregate([
      { $match: { username } },
      {
        $lookup: {
          from: 'posts',
          let: { userId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: 'likes',
                let: { postId: { $toString: '$_id' }, userId: { $toString: tokenData?.id } },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: [{ $toString: '$postId' }, '$$postId'] },
                          { $eq: [{ $toString: '$userId' }, '$$userId'] },
                        ],
                      },
                    },
                  },
                ],
                as: 'userLikes',
              },
            },
            {
              $addFields: {
                isLiked: { $gt: [{ $size: '$userLikes' }, 0] },
              },
            },
            {
              $project: {
                userLikes: 0,
              },
            },
          ],
          as: 'posts',
        },
      },
      {
        $project: {
          username: 1,
          name: 1,
          profilePic: '$profilePic',
          posts: 1,
          postsCount: { $size: '$posts' },
        },
      },
    ])

    if (!foundUser.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = foundUser[0]
    user.isMe = tokenData && tokenData.username === username

    if (!user.posts.length) {
      return NextResponse.json({ message: 'No posts found' }, { status: 200 })
    }

    const nextPage = user.posts.length === limit ? `${url.pathname}?page=${page + 1}` : ''
    // const nextPage = nextPageUrl ? `${url.pathname}${nextPageUrl}` : null

    console.log(nextPage)

    return NextResponse.json({ user, posts: user.posts, nextPage }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
