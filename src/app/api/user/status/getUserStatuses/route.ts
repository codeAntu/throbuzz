import { connect } from '@/dbConfig/dbConfig'
import Status from '@/models/status'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get all non-expired statuses for the user
    const now = new Date()
    const statuses = await Status.find({
      user: userId,
      expireAt: { $gt: now },
    })
      .sort({ createdAt: -1 })
      .populate('user', 'name username profileImage')
      .lean()

    return NextResponse.json({ statuses }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching user statuses:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
