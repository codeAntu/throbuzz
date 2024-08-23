import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { title } from 'process'

connect()

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    const user = await User.findOne({
      email,
    })

    if (!user) {
      return NextResponse.json(
        {
          title: 'User not found',
          error: 'User not found with this email ',
        },
        { status: 404 },
      )
    }

    if (user.isVerified) {
      return NextResponse.json(
        {
          title: 'User already verified',
          error: 'User is already verified',
        },
        { status: 400 },
      )
    }

    if (!user.verificationCode) {
      return NextResponse.json(
        {
          title: 'Verification code not generated',
          error: 'Verification code not generated for this user',
        },
        { status: 400 },
      )
    }

    if (user.verificationCodeExpires < new Date()) {
      return NextResponse.json(
        {
          title: 'OTP expired',
          error: 'OTP expired , signup again to get new OTP',
        },
        { status: 400 },
      )
    }

    if (user.verificationCode !== otp) {
      return NextResponse.json(
        {
          title: 'Invalid OTP',

          error: 'Invalid OTP , please enter correct OTP',
        },
        { status: 400 },
      )
    }

    user.isVerified = true
    user.verificationCode = ''
    user.verificationCodeExpires = new Date()

    await user.save()

    return NextResponse.json(
      {
        title: 'User verified successfully',
        message: 'User verified successfully',
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
