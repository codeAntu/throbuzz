import { Document, Schema } from 'mongoose'

export interface UserT extends Document {
  name: string
  email: string
  username: string
  password: string
  isVerified: boolean
  isAdmin: boolean
  forgotPassword: string
  forgotPasswordExpires: Date
  verificationCode: string
  verificationCodeExpires: Date
  createdAt: Date
  updatedAt: Date
  profilePic: string
  profileCover: string
  bio: string
  about: string
  friends: [Schema.Types.ObjectId]
  friendRequests: []
  following: []
  followers: []
  projects: []
  notifications: []
  posts: []
  phone: string
}
