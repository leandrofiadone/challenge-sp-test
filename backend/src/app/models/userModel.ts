// src/app/models/userModel.ts
import mongoose from "mongoose"

interface User {
  name: string
  city: string
  country: string
  favorite_sport: string
}

const userSchema = new mongoose.Schema<User>({
  name: String,
  city: String,
  country: String,
  favorite_sport: String
})

const UserModel = mongoose.model<User>("User", userSchema, 'users')

export default UserModel
