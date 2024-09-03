import mongoose from 'mongoose'

interface FriendRequestT extends mongoose.Document {
  sender: mongoose.Schema.Types.ObjectId
  receiver: mongoose.Schema.Types.ObjectId
  status: string
}

const friendRequestSchema: mongoose.Schema<FriendRequestT> = new mongoose.Schema(
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
