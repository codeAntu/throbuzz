import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import CommentReply from '@/models/commentReplyModel'

connect()

const dataZ = z.object({
  content: z.string().nonempty(),
  commentReplyId: z.string().nonempty(),
})

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { content, commentReplyId } = parseResult.data

    const commentReply = await CommentReply.findByIdAndUpdate(commentReplyId, { content })

    if (!commentReply) {
      return NextResponse.json({ error: 'Comment reply not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Comment reply updated successfully', commentReply }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
