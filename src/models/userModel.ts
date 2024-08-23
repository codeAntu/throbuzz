import type { UserT } from '@/lib/types'
import mongoose, { Schema } from 'mongoose'

const userSchema: Schema<UserT> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPassword: {
    type: String,
    default: '',
  },
  forgotPasswordExpires: {
    type: Date,
  },
  verificationCode: {
    type: String,
    default: '',
  },
  verificationCodeExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  profilePic: {
    type: String,
    default: '',
  },
  profileCover: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  about: {
    type: String,
    default: '',
  },
  friends: {
    type: [Schema.Types.ObjectId],
    // type : [ FriendsSchema]
    default: [],
  },
  friendRequests: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  following: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  followers: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  projects: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  notifications: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  posts: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  phone: {
    type: String,
    default: '',
  },
})

const User = (mongoose.models.User as mongoose.Model<UserT>) || mongoose.model<UserT>('User', userSchema)

export default User
