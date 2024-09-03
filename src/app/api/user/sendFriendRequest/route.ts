import { connect } from '@/dbConfig/dbConfig'
import { NextApiRequest } from 'next'
import { NextRequest } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  const { userId, friendId } = await request.json()
}
