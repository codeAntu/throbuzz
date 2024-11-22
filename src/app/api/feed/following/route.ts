import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Follow from '@/models/follows'
import { parseJson } from '@/utils/utils'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'

connect()

export async function POST(req: NextRequest) {
  const body = await parseJson(req)

  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)
  const skip = (page - 1) * limit

  try {
    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tokenUserId = new mongoose.Types.ObjectId(tokenData.id)

    const posts = await Follow.aggregate([
      {
        $match: { follower: tokenUserId },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'posts',
        },
      },
      {
        $unwind: '$posts',
      },
      {
        $match: {
          'posts.visibility': 'public',
        },
      },
      { $replaceRoot: { newRoot: '$posts' } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'author',
          pipeline: [
            {
              $project: {
                name: 1,
                username: 1,
                profilePic: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$author',
      },
      {
        $lookup: {
          from: 'likes',
          let: { postId: { $toString: '$_id' }, userId: { $toString: tokenUserId } },
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
    ])

    const nextPageUrl = posts.length === limit ? `/api/feed/friends?page=${page + 1}&limit=${limit}` : null

    return NextResponse.json({ posts, nextPageUrl })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.errors,
      },
      {
        status: 400,
      },
    )
  }
}
