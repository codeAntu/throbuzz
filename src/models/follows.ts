import mongoose from 'mongoose'

export interface FollowT extends mongoose.Document {
  follower: mongoose.Schema.Types.ObjectId
  following: mongoose.Schema.Types.ObjectId
}

const followSchema: mongoose.Schema<FollowT> = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

const Follow = (mongoose.models.Follow as mongoose.Model<FollowT>) || mongoose.model<FollowT>('Follow', followSchema)

export default Follow
