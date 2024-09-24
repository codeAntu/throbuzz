import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Notification from '@/models/notificationModel'

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Invalid token', success: false }, { status: 400 })
    }

    const userId = tokenData.id

    // create a demo notification

    const notification = new Notification({
      userId,
      title: 'New Notification',
      message: 'This is a new notification',
      url: '/notifications',
    })

    await notification.save()

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, success: false }, { status: 400 })
  }
}
