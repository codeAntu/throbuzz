import { connect } from '@/dbConfig/dbConfig'
import { parseJson } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { TokenDataT } from '@/lib/types'

connect()

export async function POST(req: NextRequest) {
  const body = await parseJson(req)

  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)
  const skip = (page - 1) * limit

  try {
    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    const tokenUserId = tokenData ? tokenData.id : null
    console.log('Token User ID:', tokenUserId)
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.errors,
      },
      {
        status: 400,
      },
    )
  }
}
