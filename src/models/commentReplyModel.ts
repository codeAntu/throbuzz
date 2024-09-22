import mongoose, { Document, Schema } from 'mongoose'
import { string } from 'zod'

interface commentReplyT extends Document {
  userId: Schema.Types.ObjectId
  postId: Schema.Types.ObjectId
  commentId: Schema.Types.ObjectId
  content: string
  replyTo: string
}

const commentReplySchema: Schema<commentReplyT> = new mongoose.Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    replyTo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const CommentReply =
  (mongoose.models.CommentReply as mongoose.Model<commentReplyT>) ||
  mongoose.model<commentReplyT>('CommentReply', commentReplySchema)

export default CommentReply
