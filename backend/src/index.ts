import express from "express"
import multer from "multer"
import cors from 'cors'
import UserModel from './app/models/cardModel'
import { uploadFile } from './app/controllers/fileController'
import { searchCards } from './app/controllers/cardController'
import connectDB from './app/utils/dbConnection'
import morgan from 'morgan'

import dotenv from "dotenv"
dotenv.config()
// Configure Express app and Multer for file upload
const app = express()
app.use(morgan('dev'))
app.use(cors())
const port = process.env.PORT || 3000
const upload = multer({dest: "uploads/"})

// Connect to MongoDB
connectDB()


// Define routes
app.post("/api/files", upload.single("file"), uploadFile)
app.get("/api/users", searchCards)

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app

