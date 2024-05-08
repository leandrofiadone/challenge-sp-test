import mongoose from "mongoose"

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    console.error("MongoDB URI is not defined in the environment variables.")
    process.exit(1) // Exit the process with an error code
  }

  try {
    await mongoose.connect(mongoUri)
    console.log("MongoDB connected")
  } catch (err) {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  }
}

export default connectDB
