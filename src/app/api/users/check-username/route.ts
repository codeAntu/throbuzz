import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

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
    const user = await User.findOne({
      username,
    })
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
  } catch (error) {
    return NextResponse.json(
      {
        title: 'Error',
        error: error,
        success: false,
      },
      { status: 500 },
    )
  }
}
