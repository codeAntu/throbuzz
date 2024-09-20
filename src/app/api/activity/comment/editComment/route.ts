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
    const { commentId, content } = await request.json()

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const comment = await Comment.findOneAndUpdate({ _id: commentId, userId }, { content })

    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Comment updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
