import mongoose, { ConnectOptions } from 'mongoose'

export async function connect() {
  if (mongoose.connection.readyState >= 1) {
    console.log('Database already connected')
    return mongoose.connection
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI! as string, {})
    console.log('Database connected')
  } catch (error) {
    console.log('Error connecting to the database')
    console.log(error)
    process.exit(1)
  }
}
