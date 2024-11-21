import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Post from '@/models/postModel'
import User from '@/models/userModel'
import Like from '@/models/likeModel'
import mongoose from 'mongoose'

connect()

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const postAggregate = await Post.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $unwind: '$author' },
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
          'author.profilePic': 1,
          'author.username': 1,
          'author.name': 1,
          'author._id': 1,
          visibility: 1,
          userId: 1,
          text: 1,
          postImages: 1,
          likes: 1,
          comments: 1,
          createdAt: 1,
          updatedAt: 1,
          color: 1,
          isLiked: 1,
        },
      },
    ])

    if (!postAggregate.length) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const post = postAggregate[0]

    if (post.visibility === 'private' && (!tokenData || post.userId.toString() !== tokenData.id)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ post })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
