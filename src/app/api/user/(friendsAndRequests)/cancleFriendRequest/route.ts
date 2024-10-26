import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Friend from '@/models/friends'
import { parseJson } from '@/utils/utils'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { friendRequestId } = await parseJson(request)

    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const friendRequest = await Friend.findOne({ _id: friendRequestId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
