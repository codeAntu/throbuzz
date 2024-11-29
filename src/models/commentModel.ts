import mongoose from 'mongoose'

interface CommentT extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId
  postId: mongoose.Schema.Types.ObjectId
  content: string
  likes: number
  comments: number
}

const commentSchema: mongoose.Schema<CommentT> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },
    comments: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },
  },
  { timestamps: true },
)

const Comment =
  (mongoose.models.Comment as mongoose.Model<CommentT>) || mongoose.model<CommentT>('Comment', commentSchema)

export default Comment
