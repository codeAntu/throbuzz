import mongoose, { Document, Schema } from 'mongoose'

interface StatusImage {
  publicId: string
  imageUrl: string
}

interface Status extends Document {
  user: Schema.Types.ObjectId
  text?: string
  image?: StatusImage
  visibility: 'public' | 'friends'
  createdAt: Date
  updatedAt: Date
  expireAt: Date
}

const statusSchema: Schema<Status> = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, default: '' },
    image: {
      publicId: { type: String },
      imageUrl: { type: String },
    },
    visibility: {
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

// Require at least one of 'text' or 'image'
statusSchema.pre('validate', function (next) {
  if (!this.text && !this.image?.imageUrl) {
    this.invalidate('text', 'Either text or image is required.')
  }
  next()
})

const Status = mongoose.models.Status || mongoose.model<Status>('Status', statusSchema)

export default Status
