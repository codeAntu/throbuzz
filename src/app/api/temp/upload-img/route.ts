import cloudinaryConfig from '@/cloudinary/cloudinaryConfig'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// export function POST(request: NextRequest) {
//   try {
//     return NextResponse.json({ message: 'Hello' }, { status: 200 })
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }

export function POST(req: NextRequest) {
  try {
    return NextResponse.json({ message: 'Hello' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
