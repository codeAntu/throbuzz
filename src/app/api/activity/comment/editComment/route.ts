import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Comment from '@/models/commentModel'
import z from 'zod'

connect()

const dataZ = z.object({
  content: z.string().min(1).max(500),
  commentId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ message: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { content, commentId } = parseResult.data

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 })
    }

    if (comment.userId.toString() !== userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    comment.content = content
    await comment.save()

    return NextResponse.json({ message: 'Comment updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
