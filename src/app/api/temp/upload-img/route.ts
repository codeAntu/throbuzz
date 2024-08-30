import cloudinaryConfig from '@/cloudinary/cloudinaryConfig'
import imageUpload from '@/cloudinary/imageUpload'
import User from '@/models/userModel'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// export function POST(request: NextRequest) {
//   try {
//     return NextResponse.json({ message: 'Hello' }, { status: 200 })
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const image = formData.get('image')

  if (!image) {
    return NextResponse.json({ error: 'Image not found' }, { status: 400 })
  }

  // console.log('image', image)

  const data = await imageUpload(image as File, 'test')

  const email = 'codeantu@gmail.com'

  const user = User.findOne({
    email,
  })

  console.log('user', user)

  // if (user && data) {
  //   user.profilePic = data.secure_url;
  //   user.save()
  // }

  return NextResponse.json(
    {
      message: 'Hello',
      img: data,
    },
    { status: 200 },
  )

  try {
    return NextResponse.json({ message: 'Hello' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
