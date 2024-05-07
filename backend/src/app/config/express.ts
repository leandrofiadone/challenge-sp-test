// src/app/config/express.ts
import express from "express"
import cors from "cors"
import fileRoutes from "../routes/fileRoutes"
import userRoutes from "../routes/userRoutes"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use(fileRoutes)
app.use(userRoutes)

export default app
