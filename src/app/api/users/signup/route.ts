import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'
import { sendEmail } from '@/mail/sendEmail'
import { title } from 'process'

connect()

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, username } = await request.json()

    if (!name || !email || !password || !username) {
      return NextResponse.json(
        {
          title: 'Invalid input',
          error: 'Please fill all the fields',
        },
        { status: 400 },
      )
    }

    email.toLowerCase()
    username.toLowerCase()

    const userByUserName = await User.findOne({ username })
    if (userByUserName?.isVerified) {
      userByUserName.username = 'test'

      return NextResponse.json(
        {
          title: 'Username already exists',
          error: 'User already exists with this username',
        },
        { status: 400 },
      )
    }
    if (userByUserName && !userByUserName.isVerified) {
      userByUserName.username = 'test'
      await userByUserName.save()
    }

    const userByEmil = await User.findOne({ email: email })

    if (userByEmil?.isVerified) {
      return NextResponse.json(
        {
          title: 'Email already exists',
          error: 'User already exists with this email',
        },
        { status: 400 },
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + 1)

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

    if (userByEmil && !userByEmil.isVerified) {
      userByEmil.name = name
      userByEmil.password = hashedPassword
      userByEmil.username = username
      userByEmil.verificationCode = verificationCode
      userByEmil.verificationCodeExpires = expiryDate
      await userByEmil.save()
    } else {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        username,
        verificationCode,
        verificationCodeExpires: expiryDate,
      })

      const savedUser = await newUser.save()
    }

    const emailResponse = await sendEmail({
      email,
      subject: 'Verify your email',
      name,
      OTP: verificationCode,
    })

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          title: 'Email not sent',
          error: 'Email not sent, please try again',
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        title: 'User created successfully',
        message: 'User created successfully',
      },
      { status: 201 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
