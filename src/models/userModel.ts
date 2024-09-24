import mongoose, { Schema } from 'mongoose'

interface UserT extends Document {
  name: string
  email: string
  username: string
  password: string
  isVerified: boolean
  isAdmin: boolean
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
  bio: string
  about: string
  friendsCount: number
  friendRequestSentCount: number
  friendRequestsCount: number
  newFriendsRequestCount: number
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
    birthday: {
      type: Date,
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
      imageUrl: {
        type: String,
        default: '',
      },
      publicId: {
        type: String,
        default: '',
      },
    },
    coverPic: {
      imageUrl: {
        type: String,
        default: '',
      },
      publicId: {
        type: String,
        default: '',
      },
    },
    bio: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    friendsCount: {
      type: Number,
      default: 0,
    },
    friendRequestsCount: {
      type: Number,
      default: 0,
    },
    newFriendsRequestCount: {
      type: Number,
      default: 0,
    },
    friendRequestSentCount: {
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
