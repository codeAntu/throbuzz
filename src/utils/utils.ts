import { NextRequest, NextResponse } from 'next/server'

export async function parseJson(req: NextRequest) {
  try {
    return await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}

export function nFormatter(num: number) {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(num)
}
