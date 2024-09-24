import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Notification from '@/models/notificationModel'
import { connect } from '@/dbConfig/dbConfig'

connect()

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Invalid token', success: false }, { status: 400 })
    }

    const userId = tokenData.id

    const notifications = await Notification.find({ userId: userId })

    return NextResponse.json({ notifications, success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 400 },
    )
  }
}
