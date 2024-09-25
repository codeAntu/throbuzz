import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Notification from '@/models/notificationModel'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'

const dataZ = z.object({
  OTP: z
    .string({ required_error: 'OTP is required' })
    .trim()
    .min(6, { message: 'OTP must be at least 6 characters long' })
    .max(6, { message: 'OTP must be at most 6 characters long' }),
  newPassword: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(8, { message: 'Password must be at least 5 characters long' })
    .max(100, { message: 'Password must be at most 100 characters long' }),
  confirmPassword: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(8, { message: 'Password must be at least 5 characters long' })
    .max(100, { message: 'Password must be at most 100 characters long' }),
})

connect()

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (tokenData.isVerified) {
      return NextResponse.json({ error: 'User already verified' }, { status: 400 })
    }

    const id = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { OTP, newPassword, confirmPassword } = parseResult.data

    if (!OTP) {
      return NextResponse.json({ error: 'OTP is required' }, { status: 400 })
    }

    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.verificationCodeExpires < new Date()) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 })
    }

    if (user.verificationCode !== OTP) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    const isPasswordCorrect = await bcryptjs.compare(newPassword, user.password)

    if (isPasswordCorrect) {
      return NextResponse.json({ error: 'New password cannot be the same as the old password' }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(newPassword, salt)

    const notification = new Notification({
      userId: user._id,
      title: 'Password reset',
      message: 'Your password has been reset successfully',
      read: false,
      readAt: null,
      url: '',
    })

    await notification.save()

    user.verificationCode = ''
    user.verificationCodeExpires = new Date()
    user.password = hashedPassword
    user.isVerified = true

    await user.save()

    const response = NextResponse.json({ message: 'User verified successfully' }, { status: 200 })

    const tokenDataNew = {
      email: user.email,
      username: user.username,
      id: user._id,
      isVerified: user.isVerified,
    }

    const tokenNew = jwt.sign(tokenDataNew, process.env.JWT_SECRET as string, {
      expiresIn: '5y',
    })

    response.cookies.set('token', tokenNew, {
      httpOnly: true,
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
