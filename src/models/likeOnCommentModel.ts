import mongoose, { Schema } from 'mongoose'

interface LikeOnCommentT extends Document {
  userId: Schema.Types.ObjectId
  reaction: string
  commentId: Schema.Types.ObjectId
  postId: Schema.Types.ObjectId
}

const likeOnCommentSchema: Schema<LikeOnCommentT> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reaction: {
      type: String,
      enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
      default: 'like',
    },
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true },
)

const LikeOnComment =
  (mongoose.models.LikeOnComment as mongoose.Model<LikeOnCommentT>) ||
  mongoose.model<LikeOnCommentT>('LikeOnComment', likeOnCommentSchema)

export default LikeOnComment
