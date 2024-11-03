import { connect } from '@/dbConfig/dbConfig'
import Comment from '@/models/commentModel'
import { NextRequest, NextResponse } from 'next/server'

connect()
export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = 20
    const skip = (page - 1) * limit

    const comments = await Comment.find({ postId })
      .populate({
        path: 'userId',
        select: 'name profilePic',
      })
      .skip(skip)
      .limit(limit)

    if (!comments.length) {
      return NextResponse.json({ comments: [], totalComments: 0, nextPage: null }, { status: 200 })
    }

    const totalComments = await Comment.countDocuments({ postId })
    const totalPages = Math.ceil(totalComments / limit)
    const nextPage = page < totalPages ? page + 1 : null

    return NextResponse.json({ comments, totalComments, nextPage }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
