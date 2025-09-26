import { connect } from '@/dbConfig/dbConfig'
import { addUsernameToBloomFilter, checkUsernameExists } from '@/helpers/checkUsername'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const userLoginValid = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(50, { message: 'Username must be at most 50 characters long' })
      .toLowerCase()
      .regex(/^[a-z0-9]*$/, { message: 'Username must contain only letters and numbers' }),
  })
  .strict()
  .refine((data) => data.username, { message: 'username is required' })

connect()

export async function POST(request: NextRequest) {
  const body = await parseJson(request)
  if (body instanceof NextResponse) return body

  try {
    const validationResult = userLoginValid.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          title: 'Invalid input',
          error: validationResult.error.errors[0]?.message || 'Invalid username',
          success: false,
        },
        { status: 400 },
      )
    }
    const { username } = validationResult.data

    const exists = await checkUsernameExists(username)

    if (exists) {
      return NextResponse.json({ message: 'Username already exists', exists: true, success: true })
    }

    await addUsernameToBloomFilter(username)

    return NextResponse.json({ message: 'Username added successfully', exists: false, success: true })
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

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const username = url.searchParams.get('username')

    const validationResult = userLoginValid.safeParse({ username })

    if (!validationResult.success) {
      return NextResponse.json(
        {
          title: 'Invalid input',
          error: validationResult.error.errors[0]?.message || 'Invalid username',
          success: false,
        },
        { status: 400 },
      )
    }

    const validatedUsername = validationResult.data.username

    const exists = await checkUsernameExists(validatedUsername)
    const isAvailable = !exists

    return NextResponse.json({ message: 'Username checked successfully', isAvailable, success: true })
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
