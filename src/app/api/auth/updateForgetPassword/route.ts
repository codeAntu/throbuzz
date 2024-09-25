import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Notification from '@/models/notificationModel'

const dataZ = z.object({})

connect()

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userId = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { newPassword, confirmPassword } = parseResult.data

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // hash new password

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(newPassword, salt)

    if (user.password === hashedPassword) {
      return NextResponse.json({ error: 'Your new password cannot be the same as the old password' }, { status: 400 })
    }

    const notification = new Notification({
      userId: user._id,
      title: 'password reset',
      message: 'Your password has been reset successfully',
      read: false,
      readAt: null,
      url: '',
    })

    await notification.save()

    user.password = hashedPassword
    user.newNotificationsCount += 1

    await user.save()

    return NextResponse.json({ success: true, message: 'Password updated successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, success: false }, { status: 400 })
  }
}
