import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const userZ = z
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
      .regex(/^[a-zA-Z0-9]*$/, { message: 'Username must contain only letters and numbers' }),

    bio: z
      .string({ required_error: 'Bio is required' })
      .trim()
      .max(100, { message: 'Bio must be at most 100 characters long' }),

    about: z
      .string({ required_error: 'About is required' })
      .trim()
      .max(1000, { message: 'About must be at most 1000 characters long' }),
  })
  .strict()

connect()

export async function POST(req: NextRequest) {
  const body = await parseJson(req)
  if (body instanceof NextResponse) return body
  try {
    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { name, username, bio, about } = userZ.parse(body)

    const user = await User.findOneAndUpdate(
      { _id: tokenData.id, isVerified: true },
      { name, username, bio, about },
      { new: true },
    )

    console.log('user', user)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const newTokenData = {
      id: user._id,
      name: user.name,
      username: user.username,
      isVerified: true,
    }

    const newToken = jwt.sign(newTokenData, process.env.JWT_SECRET!, {
      expiresIn: '5y',
    })

    const res = NextResponse.json(
      {
        success: true,
        message: 'User updated successfully',
      },
      {
        status: 200,
      },
    )

    res.cookies.set('token', newToken, {
      httpOnly: true,
    })

    return res
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
