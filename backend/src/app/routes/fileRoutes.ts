// src/app/routes/fileRoutes.ts
import express from "express"
import {uploadFile} from "../controllers/fileController"
import multer from "multer"

const router = express.Router()
const upload = multer({dest: "uploads/"})

router.post("/api/files", upload.single("file"), uploadFile)

export default router
