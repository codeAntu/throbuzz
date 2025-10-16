import mongoose, { Document, Schema } from 'mongoose'

interface Status extends Document {
  user: Schema.Types.ObjectId
  content: string
  imageUrl?: string
  privacy: 'public' | 'friends' | 'only me'
  createdAt: Date
  updatedAt: Date
  expireAt: Date
}

const statusSchema: Schema<Status> = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    privacy: {
      type: String,
      enum: ['public', 'friends', 'only me'],
      default: 'public',
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours TTL
      index: { expires: '0s' },
    },
  },
  { timestamps: true },
)

// Require at least one of 'content' or 'imageUrl'
statusSchema.pre('validate', function (next) {
  if (!this.content && !this.imageUrl) {
    this.invalidate('content', 'Either content or imageUrl is required.')
  }
  next()
})

export default mongoose.models.Status || mongoose.model<Status>('Status', statusSchema)
