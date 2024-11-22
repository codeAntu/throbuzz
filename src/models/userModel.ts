import mongoose, { Schema } from 'mongoose'
import { number } from 'zod'

interface UserT extends Document {
  name: string
  email: string
  username: string
  password: string
  isVerified: boolean
  isAdmin: boolean
  bio: string
  about: string
  phone: string
  birthday: Date
  facebook: string
  twitter: string
  linkedin: string
  instagram: string
  github: string
  website: string
  skills: string
  interests: string
  isBirthdayPrivate: boolean
  isEmailPrivate: boolean
  isPhonePrivate: boolean
  isProfilePrivate: boolean
  forgotPassword: string
  forgotPasswordExpires: Date
  verificationCode: string
  verificationCodeExpires: Date
  profilePic: {
    imageUrl: string
    publicId: string
  }
  coverPic: {
    imageUrl: string
    publicId: string
  }
  followers: number
  following: number
  postsCount: number
  newNotificationsCount: number
  deActivated: boolean
  deactivatedAt: Date
}

const userSchema: Schema<UserT> = new mongoose.Schema(
  {
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
    phone: {
      type: String,
      default: '',
    },
    isPhonePrivate: {
      type: Boolean,
      default: false,
    },
    birthday: {
      type: Date,
    },
    isBirthdayPrivate: {
      type: Boolean,
      default: false,
    },
    isEmailPrivate: {
      type: Boolean,
      default: false,
    },
    facebook: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    skills: {
      type: String,
      default: '',
    },
    interests: {
      type: String,
      default: '',
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
    profilePic: {
      type: mongoose.Schema.Types.Mixed,
      default: { imageUrl: '', publicId: '' },
    },
    coverPic: {
      type: mongoose.Schema.Types.Mixed,
      default: { imageUrl: '', publicId: '' },
    },
    bio: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    isProfilePrivate: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    postsCount: {
      type: Number,
      default: 0,
    },
    newNotificationsCount: {
      type: Number,
      default: 0,
    },
    deActivated: {
      type: Boolean,
      default: false,
    },
    deactivatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const User = (mongoose.models.User as mongoose.Model<UserT>) || mongoose.model<UserT>('User', userSchema)

export default User
