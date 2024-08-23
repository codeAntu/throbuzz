import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    const user = await User.findOne({
      email,
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found with this email ' }, { status: 404 })
    }

    if (user.verificationCode !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }

    if (user.verificationCodeExpires < new Date()) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 })
    }

    user.isVerified = true

    await user.save()

    return NextResponse.json({ message: 'User verified successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
