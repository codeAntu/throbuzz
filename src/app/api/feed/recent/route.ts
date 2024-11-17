import { connect } from '@/dbConfig/dbConfig'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { TokenDataT } from '@/lib/types'
import Post from '@/models/postModel'

connect()

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)
  const skip = (page - 1) * limit

  try {
    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const tokenUserId = tokenData ? tokenData.id : null
    console.log('Token User ID:', tokenUserId)

    const posts = await Post.aggregate([
      {
        $match: {
          visibility: 'public',
        },
      },
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

    return NextResponse.json(
      {
        posts,
      },
      {
        status: 200,
      },
    )
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
