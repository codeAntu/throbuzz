import imageDelete from '@/cloudinary/cloudinaryDeleteImage'
import { CloudinaryResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  try {
    const { publicId } = await req.json()

    console.log('publicId', publicId)

    if (!publicId) {
      return NextResponse.json({ error: 'PublicId not found' }, { status: 400 })
    }

    // console.log('publicId', publicId)

    const data = (await imageDelete(publicId as string)) as CloudinaryResponse

    console.log('data', data)

    return NextResponse.json(
      {
        message: 'Hello',
        // img: data,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
