import { connect } from '@/dbConfig/dbConfig'
import { CloudinaryImageResponse, TokenDataT } from '@/lib/types'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import imageUpload from '@/cloudinary/cloudinaryUploadImage'

// name,
// username,
// bio,
// email,
// phone,
// instagram,
// github,
// twitter,
// facebook,
// linkedin,
// website,

const userZ = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(100, { message: 'Name must be at most 100 characters long' })
      .regex(/^[a-zA-Z\s]*$/, { message: 'Name must contain only letters' })
      .optional(),
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(50, { message: 'Username must be at most 50 characters long' })
      .toLowerCase()
      .regex(/^[a-zA-Z0-9]*$/, { message: 'Username must contain only letters and numbers' })
      .optional(),

    bio: z
      .string({ required_error: 'Bio is required' })
      .trim()
      .max(200, { message: 'Bio must be at most 200 characters long' })
      .optional(),
    phone: z
      .string({ required_error: 'Phone is required' })
      .min(10, { message: 'Phone must be at least 10 characters long' })
      .optional(),

    instagram: z.string({ required_error: 'Instagram is required' }).url().optional(),
    github: z.string({ required_error: 'Github is required' }).url().optional(),
    twitter: z.string({ required_error: 'Twitter is required' }).url().optional(),
    facebook: z.string({ required_error: 'Facebook is required' }).url().optional(),
    linkedin: z.string({ required_error: 'Linkedin is required' }).url().optional(),
    website: z.string({ required_error: 'Website is required' }).url().optional(),
  })
  .strict()

connect()

export async function POST(req: NextRequest) {
  try {
    const token = (await req.cookies.get('token')?.value) || ''
    const tokenData = jwt.decode(token) as TokenDataT

    if (!tokenData || !tokenData.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const formData = await req.formData()
    const body: any = {}
    formData.forEach((value, key) => {
      if (key !== 'profileImage') {
        body[key] = value
      }
    })

    const { name, username, bio, phone, instagram, github, twitter, facebook, linkedin, website } = userZ.parse(body)

    const user = await User.findById(tokenData.id)

    if (!user || !user.isVerified) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (name) {
      user.name = name
      console.log('name', name)
    }
    if (username) {
      user.username = username
      console.log('username', username)
    }
    if (bio) {
      user.bio = bio
      console.log('bio', bio)
    }
    if (phone) {
      user.phone = phone
      console.log('phone', phone)
    }
    if (instagram) {
      user.instagram = instagram
      console.log('instagram', instagram)
    }
    if (github) {
      user.github = github
      console.log('github', github)
    }
    if (twitter) {
      user.twitter = twitter
      console.log('twitter', twitter)
    }
    if (facebook) {
      user.facebook = facebook
      console.log('facebook', facebook)
    }
    if (linkedin) {
      user.linkedin = linkedin
      console.log('linkedin', linkedin)
    }
    if (website) {
      user.website = website
      console.log('website', website)
    }

    // Handle image upload
    const image = formData.get('profileImage')

    console.log('image', image)

    if (image) {
      const img = (await imageUpload(image as File)) as CloudinaryImageResponse
      user.profilePic = {
        imageUrl: img.secure_url,
        publicId: img.public_id,
      }
    }

    await user.save()

    const newTokenData = {
      id: user._id,
      name: user.name,
      username: user.username,
      isVerified: true,
    }

    const newToken = jwt.sign(newTokenData, process.env.JWT_SECRET!, {
      expiresIn: '5y',
    })

    const res = NextResponse.json(
      {
        success: true,
        message: 'User updated successfully',
      },
      {
        status: 200,
      },
    )

    res.cookies.set('token', newToken, {
      httpOnly: true,
    })

    return res
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
