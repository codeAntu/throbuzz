import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Notification from '@/models/notificationModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Invalid token', success: false }, { status: 400 })
    }

    const userId = tokenData.id

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '20', 10)
    const skip = (page - 1) * limit

    // Fetch notifications with pagination
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit)

    // Check if there are more notifications to load
    const totalNotifications = await Notification.countDocuments({ userId })
    const hasNextPage = skip + notifications.length < totalNotifications
    const nextPage = hasNextPage ? page + 1 : null
    const nextLink = hasNextPage ? `${url.origin}${url.pathname}?page=${nextPage}&limit=${limit}` : null

    return NextResponse.json({ notifications, nextLink, success: true }, { status: 200 })
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
