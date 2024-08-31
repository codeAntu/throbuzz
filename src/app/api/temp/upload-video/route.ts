import videoUpload from '@/cloudinary/cloudinaryUploadVideo'
import { CloudinaryVideoResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const video = formData.get('video')

    if (!video) {
      return { status: 400, json: { error: 'Video not found' } }
    }

    console.log('video', video)

    const data = (await videoUpload(video as File, 'test')) as CloudinaryVideoResponse

    console.log('data', data)

    return NextResponse.json(
      {
        message: 'Hello',
        img: data,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
