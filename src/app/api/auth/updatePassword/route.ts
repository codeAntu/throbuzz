import { TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'

const dataZ = z.object({
  password: z
    .string({ required_error: 'Password is required' })
    .min(5, { message: 'Password must be at least 5 characters long' }),
  newPassword: z
    .string({ required_error: 'New password is required' })
    .min(5, { message: 'New password must be at least 5 characters long' }),
  confirmPassword: z
    .string({ required_error: 'Confirm password is required' })
    .min(5, { message: 'Confirm password must be at least 5 characters long' }),
})

export async function POST(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userId = tokenData.id

    const parseResult = dataZ.safeParse(await request.json())
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input', details: parseResult.error.errors }, { status: 400 })
    }

    const { password, newPassword, confirmPassword } = parseResult.data

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 400 })
    }

    // hash new password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(newPassword, salt)

    user.password = hashedPassword

    await user.save()

    return NextResponse.json({ success: true, message: 'Password updated successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, success: false }, { status: 400 })
  }
}
