import { colorNames } from '@/lib/const'
import mongoose, { Document, Schema } from 'mongoose'

interface PostT extends Document {
  userId: Schema.Types.ObjectId
  text: string
  visibility: string
  publicIds: string[]
  likes: number
  comments: number
  color: string
}

const postSchema: Schema<PostT> = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    text: {
      type: String,
    },
    publicIds: {
      type: [String],
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      enum: colorNames,
      default: 'stone',
    },
  },
  { timestamps: true },
)

const Post = (mongoose.models.Post as mongoose.Model<PostT>) || mongoose.model<PostT>('Post', postSchema)

export default Post
