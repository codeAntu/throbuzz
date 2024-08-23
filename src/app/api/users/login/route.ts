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

    if (!searchKey || !password) {
      return NextResponse.json(
        {
          title: 'Please enter all fields',
          error: 'Please enter all fields',
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
        },
        { status: 404 },
      )
    }

    if (!user.isVerified) {
      return NextResponse.json(
        {
          title: 'User not verified',
          error: 'User is not verified yet, please verify your email first',
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

    return NextResponse.json(
      { token, title: 'Login successful', message: 'You have successfully logged in' },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
