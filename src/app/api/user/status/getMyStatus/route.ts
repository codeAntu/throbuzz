import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Status from '@/models/status'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT
    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const user = await User.findById(tokenData.id).select('name username profileImage').lean()
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const statuses = await Status.find({ user: user._id }).sort({ createdAt: -1 }).lean()

    return NextResponse.json(
      {
        user,
        statuses,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
