import { connect } from '@/dbConfig/dbConfig'
import Notification from '@/models/notificationModel'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import bcryptjs from 'bcryptjs'
import { error } from 'console'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const userLoginValid = z
  .object({
    searchKey: z
      .string({ required_error: 'Email is required' }) //
      .trim()
      .min(3, { message: 'Email must be at least 5 characters long' })
      .max(100, { message: 'Email must be at most 100 characters long' })
      .toLowerCase(),
    password: z
      .string({ required_error: 'Password is required' })
      .trim()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
  })
  .strict()
  .refine((data) => data.searchKey, { message: 'Email or username is required' })
  .refine((data) => data.password, { message: 'Password is required' })

connect()

export async function POST(request: NextRequest) {
  const body = await parseJson(request)
  if (body instanceof NextResponse) return body // Return if error response

  try {
    let { searchKey, password } = userLoginValid.parse(body)

    const extToken = (await request.cookies.get('token')?.value) || ''

    if (extToken) {
      return NextResponse.json(
        {
          title: 'Already logged in',
          message: 'User already logged in',
          success: true,
        },
        { status: 200 },
      )
    }

    if (!searchKey || !password) {
      return NextResponse.json(
        {
          title: 'Please enter all fields',
          error: 'Please enter all fields',
          success: false,
        },
        { status: 400 },
      )
    }

    const email = searchKey.includes('@') ? searchKey : undefined
    const username = searchKey.includes('@') ? undefined : searchKey

    // todo :  check if user exists

    const user = await User.findOne({
      $or: [
        { email, isVerified: true },
        { username, isVerified: true },
      ],
    })

    console.log('user', user)

    if (!user) {
      return NextResponse.json(
        {
          title: 'User not found',
          error: 'User not found with this email or username',
          success: false,
        },
        { status: 404 },
      )
    }

    if (!user.isVerified) {
      return NextResponse.json(
        {
          title: 'User not verified',
          error: 'User is not verified yet, please verify your email first',
          success: false,
        },
        { status: 400 },
      )
    }

    const isMatch = await bcryptjs.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        {
          title: 'Wrong password',
          error: 'Wrong password entered, please enter the correct password',
          success: false,
        },
        { status: 400 },
      )
    }

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

    // const userAgent = request.headers.get('user-agent') || 'Unknown device'

    // const notification = new Notification({
    //   userId: user._id,
    //   title: 'User logged in',
    //   message: `User has logged in from device: ${userAgent}`,
    //   read: false,
    //   readAt: new Date(),
    //   url: '',
    // })

    // await notification.save()

    // // update newNotificationsCount for user

    // user.newNotificationsCount += 1
    // await user.save()

    return response
  } catch (error: any) {
    const errorMessage = error.errors ? error.errors[0].message : error.message
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
