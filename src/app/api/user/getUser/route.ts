import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username } = await req.json()

    console.log('username', username)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.response.data }, { status: 400 })
  }
}
