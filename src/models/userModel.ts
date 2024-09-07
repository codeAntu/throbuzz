import mongoose, { Schema } from 'mongoose'

interface UserT extends Document {
  name: string
  email: string
  username: string
  password: string
  isVerified: boolean
  isAdmin: boolean
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
  createdAt: Date
  updatedAt: Date
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
  friends: [Schema.Types.ObjectId]
  friendsCount: number
  friendRequests: []
  friendRequestsCount: number
  following: []
  followingCount: number
  followers: []
  followersCount: number
  projects: []
  notifications: []
  posts: []
  postsCount: number
  phone: string
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
    friends: {
      type: [Schema.Types.ObjectId],
      // type : [ FriendsSchema]
      default: [],
    },
    friendsCount: {
      type: Number,
      default: 0,
    },
    friendRequests: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    friendRequestsCount: {
      type: Number,
      default: 0,
    },
    following: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    followersCount: {
      type: Number,
      default: 0,
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
    postsCount: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      default: '',
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
