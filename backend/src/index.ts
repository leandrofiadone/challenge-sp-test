// import express from "express"
// import multer from "multer"
// import csvtojson from "csvtojson"
// import mongoose from "mongoose"
// import cors from 'cors'
// import dotenv from "dotenv"
// dotenv.config()


// // Interface and Schema for User model
// interface User {
//   name: string
//   city: string
//   country: string
//   favorite_sport: string
// }

// const userSchema = new mongoose.Schema<User>({
//   name: String,
//   city: String,
//   country: String,
//   favorite_sport: String
// })

// const User = mongoose.model<User>("User", userSchema)

// // Configure Express app and Multer for file upload
// const app = express()
// app.use(cors())
// const port = process.env.PORT || 3000
// const upload = multer({dest: "uploads/"})

// // Connect to MongoDB
// // Connect to MongoDB
// const mongoUri = process.env.MONGODB_URI;
// if (!mongoUri) {
//   console.error("MongoDB URI is not defined in the environment variables.");
//   process.exit(1); // Exit the process with an error code
// }
// mongoose.connect(mongoUri);



// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected")
// })

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err)
// })

// // Upload Route handler
// const uploadFile = async (req: express.Request, res: express.Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({message: "No file uploaded."})
//     }

//     const csvData = await csvtojson().fromFile(req.file.path)
//     await User.insertMany(csvData)

//     res.status(200).json({message: "The file was uploaded successfully."})
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({message: "Error uploading file."})
//   }
// }

// // Search Route handler
// const searchUsers = async (req: express.Request, res: express.Response) => {
//   const searchTerm = req.query.q?.toString().toLowerCase() || ""

//   try {
//     const users = await User.find({
//       $or: [
//         {name: {$regex: searchTerm, $options: "i"}},
//         {city: {$regex: searchTerm, $options: "i"}},
//         {country: {$regex: searchTerm, $options: "i"}},
//         {favorite_sport: {$regex: searchTerm, $options: "i"}}
//       ]
//     })

//     res.status(200).json({data: users})
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({message: "Error searching users."})
//   }
// }

// // Define routes
// app.post("/api/files", upload.single("file"), uploadFile)
// app.get("/api/users", searchUsers)

// // Start server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`)
// })

// export default app

// src/index.ts
import app from "./app/config/express";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
