import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Notification from '@/models/notificationModel'
import User from '@/models/userModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Invalid token', success: false }, { status: 400 })
    }

    const userId = tokenData.id

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json({ error: 'User not found', success: false }, { status: 404 })
    }

    // Parse query parameters for pagination
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '20', 10)
    const skip = (page - 1) * limit

    // Fetch notifications with pagination
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit)

    // Update the read field for the fetched notifications
    const notificationIds = notifications.map((notification) => notification._id)
    await Notification.updateMany(
      { _id: { $in: notificationIds }, read: false },
      { $set: { read: true, readAt: new Date() } },
    )

    // Check if there are more notifications to load
    const totalNotifications = await Notification.countDocuments({ userId })
    const hasNextPage = skip + notifications.length < totalNotifications
    const nextPage = hasNextPage ? page + 1 : null
    const nextLink = hasNextPage ? `${url.origin}${url.pathname}?page=${nextPage}&limit=${limit}` : null

    const newNotificationsCount = user.newNotificationsCount - notifications.length
    user.newNotificationsCount = newNotificationsCount > 0 ? newNotificationsCount : 0
    await user?.save()

    return NextResponse.json({ notifications, nextLink, newNotificationsCount, success: true }, { status: 200 })
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

// import { connect } from '@/dbConfig/dbConfig'
// import { TokenDataT } from '@/lib/types'
// import { NextRequest, NextResponse } from 'next/server'
// import jwt from 'jsonwebtoken'
// import Notification from '@/models/notificationModel'
// import User from '@/models/userModel'

// connect()

// export async function POST(request: NextRequest) {
//   try {
//     const token = (await request.cookies.get('token')?.value) || ''
//     const tokenData = jwt.decode(token) as TokenDataT

//     if (!tokenData) {
//       return NextResponse.json({ error: 'Invalid token', success: false }, { status: 400 })
//     }

//     const userId = tokenData.id

//     const user = await User.findById(userId)

//     if (!user) {
//       return NextResponse.json({ error: 'User not found', success: false }, { status: 404 })
//     }

//     // Parse query parameters for pagination
//     const url = new URL(request.url)
//     const page = parseInt(url.searchParams.get('page') || '1', 10)
//     const limit = parseInt(url.searchParams.get('limit') || '20', 10)
//     const skip = (page - 1) * limit

//     const aggregationPipeline = [
//       { $match: { userId } },
//       { $sort: { createdAt: -1 as -1 } },
//       {
//         $facet: {
//           notifications: [{ $skip: skip }, { $limit: limit }],
//           totalCount: [{ $count: 'count' }],
//         },
//       },
//     ]

//     const result = await Notification.aggregate(aggregationPipeline)
//     const notifications = result[0].notifications
//     const totalNotifications = result[0].totalCount[0]?.count || 0

//     const hasNextPage = skip + notifications.length < totalNotifications
//     const nextPage = hasNextPage ? page + 1 : null
//     const nextLink = hasNextPage ? `${url.origin}${url.pathname}?page=${nextPage}&limit=${limit}` : null

//     const newNotificationsCount = user.newNotificationsCount - notifications.length
//     user.newNotificationsCount = newNotificationsCount > 0 ? newNotificationsCount : 0
//     await user?.save()

//     return NextResponse.json({ notifications, nextLink, success: true }, { status: 200 })
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         error: error.message,
//         success: false,
//       },
//       { status: 400 },
//     )
//   }
// }
