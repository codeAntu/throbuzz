import mongoose, { Document, Schema } from 'mongoose'
import { string } from 'zod'

interface commentReplyT extends Document {
  userId: Schema.Types.ObjectId
  commentId: Schema.Types.ObjectId
  content: string
  likes: number
}

const commentReplySchema: Schema<commentReplyT> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const CommentReply =
  (mongoose.models.CommentReply as mongoose.Model<commentReplyT>) ||
  mongoose.model<commentReplyT>('CommentReply', commentReplySchema)

export default CommentReply