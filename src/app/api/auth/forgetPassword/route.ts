import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import { sendEmail } from '@/mail/mailer'
import EmailComponent from '@/mail/verifyAccountTemplate'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const dataZ = z.object({
  searchKey: z
    .string({ required_error: 'Email is required' }) //
    .trim()
    .min(3, { message: 'Email must be at least 3 characters long' })
    .max(100, { message: 'Email must be at most 100 characters long' })
    .toLowerCase(),
})

connect()

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (tokenData && tokenData.isVerified) {
      return NextResponse.json({ error: 'User already logged in' }, { status: 400 })
    }

    const parseResult = dataZ.safeParse(await request.json())

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { searchKey } = parseResult.data

    if (!searchKey) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user exists
    const user = await User.findOne({
      $or: [{ email: searchKey }, { username: searchKey }],
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: 'User not verified' }, { status: 400 })
    }

    // create a token and send it to the user's email

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    user.verificationCode = verificationCode
    user.verificationCodeExpires = new Date(Date.now() + 30 * 60 * 1000)
    await user.save()

    // send email
    const htmlToSend = EmailComponent.generateEmailHtml({
      name: user.name,
      OTP: verificationCode,
      message: 'Reset your password , verify your email withing 30 minutes',
    })

    await sendEmail({
      to: user.email,
      subject: 'Reset your password',
      html: htmlToSend,
    })

    const response = NextResponse.json({ message: 'Verification code sent to your email' }, { status: 200 })

    const tokenDataNew = {
      email: user.email,
      username: user.username,
      id: user._id,
      isVerified: false,
    }

    const newToken = jwt.sign(tokenDataNew, process.env.JWT_SECRET as string, { expiresIn: '30m' })

    response.cookies.set('token', newToken, {
      httpOnly: true,
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
