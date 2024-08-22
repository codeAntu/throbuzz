import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const { name, email, userName, password } = await request.json()

    console.log('name', name)
    console.log('email', email)
  } catch (error: any) {
    console.log('error', error.message)
  }
}
