// src/app/routes/userRoutes.ts
import express from "express"
import {searchUsers} from "../controllers/userController"

const router = express.Router()

router.get("/api/users", searchUsers)

export default router
