import express from "express"
import multer from "multer"
import csvtojson from "csvtojson"
import mongoose from "mongoose"
import cors from 'cors'

import dotenv from "dotenv"
dotenv.config()

import UserModel from './app/models/userModel'
import { uploadFile } from './app/controllers/fileController'
import { searchUsers } from './app/controllers/userController'

// Configure Express app and Multer for file upload
const app = express()
app.use(cors())
const port = process.env.PORT || 3000
const upload = multer({dest: "uploads/"})

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1); // Exit the process with an error code
}
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected")
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})


// Define routes
app.post("/api/files", upload.single("file"), uploadFile)
app.get("/api/users", searchUsers)

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app

