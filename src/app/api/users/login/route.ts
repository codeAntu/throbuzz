import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { error } from 'console'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const { searchKey, password } = await request.json()
    const extToken = (await request.cookies.get('token')?.value) || ''
    const extTokenData = jwt.verify(extToken, process.env.JWT_SECRET as string)

    if (extTokenData) {
      return NextResponse.json(
        {
          title: 'Already logged in',
          message: 'User already logged in',
          success: true,
          tokenData: extTokenData,
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

    searchKey.trim().toLowerCase()

    const email = searchKey.includes('@') ? searchKey : undefined
    const username = searchKey.includes('@') ? undefined : searchKey

    // todo :  check if user exists

    const user = await User.findOne({
      $or: [{ email }, { username, isVerified: true }],
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
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
      expiresIn: '5y',
    })

    const response = NextResponse.json({
      title: 'Login successful',
      message: 'User Login successful',
      success: true,
      tokenData,
    })

    response.cookies.set('token', token, {
      httpOnly: true,
    })

    console.log('token', token)

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
