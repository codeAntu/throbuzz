import mongoose, { Schema } from 'mongoose'

interface PostT extends Document {
  user: Schema.Types.ObjectId
  text: string
  isPrivate: boolean
  publicId: string[]
  likes: number
  comments: number
}

const postSchema: Schema<PostT> = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
  },
  publicId: {
    type: [String],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
})

const Post = (mongoose.models.Post as mongoose.Model<PostT>) || mongoose.model<PostT>('Post', postSchema)
