import mongoose, { Document } from 'mongoose'

interface Notification extends Document {
  userId: string
  title: string
  message: string
  read: boolean
  readAt: Date
  url: string
}

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'User is required'],
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true },
)

notificationSchema.index({ readAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 })

const Notification =
  (mongoose.models.Notification as mongoose.Model<Notification>) ||
  mongoose.model<Notification>('Notification', notificationSchema)

export default Notification
