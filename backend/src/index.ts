import express from "express"
import multer from "multer"

import cors from 'cors'

import dotenv from "dotenv"
dotenv.config()

import UserModel from './app/models/userModel'
import { uploadFile } from './app/controllers/fileController'
import { searchUsers } from './app/controllers/userController'
import connectDB from './app/utils/dbConnection'

// Configure Express app and Multer for file upload
const app = express()
app.use(cors())
const port = process.env.PORT || 3000
const upload = multer({dest: "uploads/"})

// Connect to MongoDB
connectDB()


// Define routes
app.post("/api/files", upload.single("file"), uploadFile)
app.get("/api/users", searchUsers)

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app

