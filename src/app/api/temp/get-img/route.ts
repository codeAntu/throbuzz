import cloudinaryConfig from '@/cloudinary/cloudinaryConfig'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// get request

export function GET(req: NextRequest) {
  cloudinaryConfig()
  try {
    const url = cloudinary.url('cld-sample-5', {
      secure: true,
      transformation: [
        { width: 1200 },
        { quality: 'auto' },
        {
          fetch_format: 'auto',
        },
        {},
      ],
    })
    return NextResponse.json({ url: url }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
