import { connect } from '@/dbConfig/dbConfig'
import redis from '@/dbConfig/redis'
import { addUsernameToBloomFilter } from '@/helpers/checkUsername'
import { TokenDataT } from '@/lib/types'
import { sendEmail } from '@/mail/mailer'
import EmailComponent from '@/mail/verifyAccountTemplate'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import bcryptjs from 'bcryptjs'
import { BloomFilter } from 'bloom-filters'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const user = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(100, { message: 'Name must be at most 100 characters long' })
      .regex(/^[a-zA-Z\s]*$/, { message: 'Name must contain only letters' }),
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(50, { message: 'Username must be at most 50 characters long' })
      .toLowerCase()
      .regex(/^[a-z0-9]*$/, { message: 'Username must contain only letters and numbers' }),
    email: z
      .string({ required_error: 'Email is required' }) //
      .trim()
      .toLowerCase()
      .email({ message: 'Invalid email format' }),
    password: z
      .string({ required_error: 'Password is required' })
      .trim()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
  })
  .strict()

connect()

export async function POST(request: NextRequest) {
  const body = await parseJson(request)
  if (body instanceof NextResponse) return body

  try {
    let { name, email, password, username } = user.parse(body)

    const extToken = (await request.cookies.get('token')?.value) || ''
    const extTokenData = jwt.decode(extToken) as TokenDataT

    console.log('extToken ', extTokenData)

    if (extTokenData?.isVerified) {
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

    if (!name || !email || !password || !username) {
      return NextResponse.json(
        {
          title: 'Invalid input',
          error: 'Please fill all the fields',
        },
        { status: 400 },
      )
    }

    const userByUserName = await User.findOne({ username })
    if (userByUserName?.isVerified) {
      userByUserName.username = Math.random().toString(36).substring(7)

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

    console.log('verificationCode', verificationCode)

    if (userByEmil && !userByEmil.isVerified) {
      userByEmil.name = name
      userByEmil.password = hashedPassword
      userByEmil.username = username
      userByEmil.verificationCode = verificationCode
      userByEmil.verificationCodeExpires = expiryDate
      await userByEmil.save()

      // Add username to bloom filter
      await addUsernameToBloomFilter(username)
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

      // Add username to bloom filter
      await addUsernameToBloomFilter(username)
    }

    const htmlToSend = EmailComponent.generateEmailHtml({
      name,
      OTP: verificationCode,
      message: 'Verify your account , verify your email withing 1 hour',
    })

    await sendEmail({
      to: email,
      subject: 'Verify your account',
      html: htmlToSend,
    })

    const response = NextResponse.json(
      {
        title: 'User created successfully',
        message: 'User created successfully',
      },
      { status: 201 },
    )

    const tokenData = {
      email,
      username,
      id: '',
      isVerified: false,
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    })

    response.cookies.set('token', token, {
      httpOnly: true,
    })

    console.log('token', token)

    return response
  } catch (error: any) {
    console.log('error', error.message)
    const errorMessage = error.errors ? error.errors[0].message : error.message
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
