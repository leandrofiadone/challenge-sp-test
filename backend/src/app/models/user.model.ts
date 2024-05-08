// src/app/models/userModel.ts
import mongoose from "mongoose"

interface User {
  username: string
  mail: string
  password: string
}

const userSchema = new mongoose.Schema<User>({
username:{
  type: String,
  required: true,
  trim:true,
  unique: true
},
mail:{
  type: String,
  required: true,
  trim: true,
  unique: true,
},
password:{
  type: String,
  required: true
}
})

const UserModel = mongoose.model<User>("User", userSchema, "users")

export default UserModel
