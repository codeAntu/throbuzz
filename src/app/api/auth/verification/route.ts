import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { title } from 'process'
import { ResponseT } from '@/lib/types'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import Notification from '@/models/notificationModel'

const userLoginValid = z
  .object({
    email: z
      .string({ required_error: 'Email is required' }) //
      .trim()
      .toLowerCase()
      .email({ message: 'Invalid email format' }),
    otp: z
      .string({ required_error: 'OTP is required' })
      .trim()
      .min(6, { message: 'OTP must be at least 6 characters long' })
      .max(6, { message: 'OTP must be at most 6 characters long' }),
  })
  .strict()
  .refine((data) => data.email || data.otp, { message: 'Email and OTP is required' })

connect()

export async function POST(request: NextRequest) {
  try {
    const { otp } = await request.json()

    const extToken = (await request.cookies.get('token')?.value) || ''
    const extTokenData = jwt.decode(extToken)
    const { email } = extTokenData as { email: string }

    console.log('extToken ', extTokenData)

    if (!email || !otp) {
      return NextResponse.json(
        {
          title: 'Invalid input',
          error: 'Email and OTP are required',
          success: false,
        },
        { status: 400 },
      )
    }

    email.toLowerCase()

    const user = await User.findOne({
      email,
    })

    if (!user) {
      return NextResponse.json(
        {
          title: 'User not found',
          error: 'User not found with this email ',
          success: false,
        },
        { status: 404 },
      )
    }

    if (user.isVerified) {
      return NextResponse.json(
        {
          title: 'User already verified',
          error: 'User is already verified',
          success: false,
        },
        { status: 400 },
      )
    }

    if (!user.verificationCode) {
      return NextResponse.json(
        {
          title: 'Verification code not generated',
          error: 'Verification code not generated for this user',
          success: false,
        },
        { status: 400 },
      )
    }

    if (user.verificationCodeExpires < new Date()) {
      return NextResponse.json(
        {
          title: 'OTP expired',
          error: 'OTP expired , signup again to get new OTP',
          success: false,
        },
        { status: 400 },
      )
    }

    if (user.verificationCode !== otp) {
      return NextResponse.json(
        {
          title: 'Invalid OTP',

          error: 'Invalid OTP , please enter correct OTP',
          success: false,
        },
        { status: 400 },
      )
    }

    user.isVerified = true
    user.verificationCode = ''
    user.verificationCodeExpires = new Date()

    const notification = new Notification({
      userId: user._id,
      title: 'User verified',
      message: 'welcome to the Throbuzz , your account is verified',
      read: false,
      readAt: null,
      url: '',
    })

    await notification.save()

    // update the user's new notification count
    // await User.findByIdAndUpdate(user._id, { $inc: { newNotificationsCount: 1 } })

    await user.save()

    const tokenData = {
      email: user.email,
      username: user.username,
      id: user._id,
      isVerified: user.isVerified,
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
      expiresIn: '5y',
    })

    const response = NextResponse.json({
      title: 'Login successful',
      message: 'User Login successful',
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        username: user.username,
        isVerified: user.isVerified,
        profilePic: user.profilePic,
        id: user._id,
      },
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365 * 5, // 5 years
    })

    // notification

    return response
  } catch (error: any) {
    const errorMessage = error.errors ? error.errors[0].message : error.message
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
