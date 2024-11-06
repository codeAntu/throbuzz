import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(req: NextRequest) {
  try {
    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      console.log('Token not found')

      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!tokenData.id) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = await User.findOne({ _id: tokenData.id, isVerified: true }).select(
      ' name email username profilePic bio phone birthday facebook twitter linkedin instagram github website ',
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
