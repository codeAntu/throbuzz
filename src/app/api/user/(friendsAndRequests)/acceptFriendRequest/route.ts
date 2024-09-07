import { connect } from '@/dbConfig/dbConfig'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const userName = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(100, { message: 'Username must be at most 100 characters long' })
      .toLowerCase()
      .optional(),
  })
  .strict()
  .refine((data) => data.username, { message: 'username is required' })

connect()

export async function POST(request: NextRequest) {
  const { username } = await userName.parse(request.body)

  return { username }
}
