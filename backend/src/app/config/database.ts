// src/app/config/database.ts
import mongoose from "mongoose"

const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  console.error("MongoDB URI is not defined in the environment variables.")
  process.exit(1)
}

mongoose.connect(mongoUri)

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected")
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})
