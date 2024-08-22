import mongoose, { ConnectOptions } from 'mongoose'

type connectionObject = {
  isConnected?: number
}

const connection: connectionObject = {}

export async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Database is already connected')
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {})

    connection.isConnected = db.connections[0].readyState
    console.log('Database connected')
  } catch (error) {
    console.log('Error connecting to the database')
    console.log(error)
    process.exit(1)
  }
}
