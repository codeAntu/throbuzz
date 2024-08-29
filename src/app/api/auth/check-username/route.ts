import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const userLoginValid = z
  .object({
    username: z
      .string({ required_error: 'Email is required' }) //
      .trim()
      .min(3, { message: 'Email must be at least 3 characters long' })
      .max(100, { message: 'Email must be at most 100 characters long' })
      .toLowerCase()
      .optional(),
  })
  .strict()
  .refine((data) => data.username, { message: 'username is required' })

connect()

export async function POST(request: NextRequest) {
  const body = await parseJson(request)
  if (body instanceof NextResponse) return body

  try {
    const { username } = await userLoginValid.parse(body)

    if (!username) {
      return NextResponse.json(
        {
          title: 'Invalid input',
          error: 'Username is required',
          success: false,
        },
        { status: 400 },
      )
    }

    console.log('username', username)

    const user = await User.findOne({ username })
    console.log('user', user)

    if (user) {
      return NextResponse.json(
        {
          title: 'User found ',
          message: 'User found with this username',
          success: false,
        },
        { status: 200 },
      )
    }
    return NextResponse.json(
      {
        title: 'User not found',
        message: 'User not found with this username',
        success: true,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        title: 'Error',
        error: error.message,
        success: false,
      },
      { status: 500 },
    )
  }
}
