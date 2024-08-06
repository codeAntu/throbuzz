import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connect", () => {
      console.log("Database connected");
    });

    connection.on("error", (error) => {
      console.log("Error connecting to the database");
      console.log(error);
    });
    
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
  }
}
