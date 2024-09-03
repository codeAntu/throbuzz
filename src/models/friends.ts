import mongoose from 'mongoose'

export interface FriendT extends mongoose.Document {
  sender: mongoose.Schema.Types.ObjectId
  receiver: mongoose.Schema.Types.ObjectId
  status: string
}

const friendSchema: mongoose.Schema<FriendT> = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
)

const Friend = (mongoose.models.Friend as mongoose.Model<FriendT>) || mongoose.model<FriendT>('Friend', friendSchema)

export default Friend
