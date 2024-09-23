import mongoose, { Document, Schema } from 'mongoose'

interface LikeOnCommentReplyT extends Document {
  userId: Schema.Types.ObjectId
  reaction: string
  commentReplyId: Schema.Types.ObjectId
  postId: Schema.Types.ObjectId
}

const likeOnCommentReplySchema: Schema<LikeOnCommentReplyT> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reaction: {
      type: String,
      enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
      default: 'like',
    },
    commentReplyId: { type: Schema.Types.ObjectId, ref: 'CommentReply', required: true },
  },
  { timestamps: true },
)

const LikeOnCommentReply =
  (mongoose.models.LikeOnCommentReply as mongoose.Model<LikeOnCommentReplyT>) ||
  mongoose.model<LikeOnCommentReplyT>('LikeOnCommentReply', likeOnCommentReplySchema)

export default LikeOnCommentReply
