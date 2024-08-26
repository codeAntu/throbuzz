import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const extToken = (await request.cookies.get('token')?.value) || ''

    if (!extToken) {
      return NextResponse.json(
        {
          title: 'Logout Failed ',
          message: 'No user was logged in ',
          success: true,
        },
        {
          status: 400,
        },
      )
    }

    const response = NextResponse.json(
      {
        title: 'Logout successful',
        message: 'Logout successful',
        success: true,
      },
      {
        status: 200,
      },
    )

    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    )
  }
}
