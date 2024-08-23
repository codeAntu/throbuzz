import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const { email, userName, password } = await request.json()

    if (!(email || userName) || !password) {
      return NextResponse.json({ error: 'Please enter all fields' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Login successful' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
