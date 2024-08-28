import mongoose, { Schema } from 'mongoose'

interface UserT extends Document {
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
  },
  {
    timestamps: true,
  },
)

const User = (mongoose.models.User as mongoose.Model<UserT>) || mongoose.model<UserT>('User', userSchema)

export default User
