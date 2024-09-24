import imageUpload from '@/cloudinary/cloudinaryUploadImage'
import { connect } from '@/dbConfig/dbConfig'
import { CloudinaryImageResponse, TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const formData = await req.formData()
    const image = formData.get('coverImage')

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 400 })
    }

    const user = await User.findById(tokenData.id)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const img = (await imageUpload(image as File)) as CloudinaryImageResponse

    user.coverPic = {
      imageUrl: img.secure_url,
      publicId: img.public_id,
    }

    await user.save()

    return NextResponse.json(
      {
        message: 'Cover image uploaded successfully',
        img,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
