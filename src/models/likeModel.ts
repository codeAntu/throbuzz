import mongoose from 'mongoose'

interface LikeT extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId
  postId: mongoose.Schema.Types.ObjectId
  reaction: string
}

const likeSchema: mongoose.Schema<LikeT> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    reaction: {
      type: String,
      enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
      default: 'like',
    },
  },
  { timestamps: true },
)

const Like = (mongoose.models.Like as mongoose.Model<LikeT>) || mongoose.model<LikeT>('Like', likeSchema)

export default Like
