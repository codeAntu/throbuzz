import cloudinaryDeleteImage from '@/cloudinary/cloudinaryDeleteImage'
import { connect } from '@/dbConfig/dbConfig'
import { TokenDataT } from '@/lib/types'
import Status from '@/models/status'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function DELETE(request: NextRequest) {
  try {
    const token = (await request.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT
    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const { statusId } = await request.json()
    if (!statusId) {
      return NextResponse.json({ error: 'Status ID required' }, { status: 400 })
    }
    const status = await Status.findById(statusId)
    if (!status) {
      return NextResponse.json({ error: 'Status not found' }, { status: 404 })
    }
    if (String(status.userId) !== String(tokenData.id)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    // Delete image from Cloudinary if present
    if (status.image && status.image.publicId) {
      try {
        await cloudinaryDeleteImage(status.image.publicId)
      } catch (e) {
        // Ignore image deletion errors
      }
    }
    await status.deleteOne()
    return NextResponse.json({ message: 'Status deleted successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
