import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import multer from "multer"
import csv from "csvtojson"
import dotenv from "dotenv"


dotenv.config()
const app = express()
const upload = multer({dest: "uploads/"})

mongoose.connect(process.env.MONGO_URL!)

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected")
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const csvSchema = new mongoose.Schema({
  name: String,
  city: String,
  country: String,
  favorite_sport: String
})
const CsvModel = mongoose.model("CsvModell", csvSchema)

// app.get("/", (req, res) => {
//   dumbledoresArmyModel.find({}, (err: any, items: any) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.json({items: items})
//     }
//   })
// })

app.post("/api/files", upload.single("file"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({message: "No file uploaded"})
  }

  const stream = csv().fromFile(req.file.path)

  stream
    .then((jsonObj: any) => {
      const army: any[] = jsonObj.map((item: any) => ({
        name: item["First Name"],
        city: item["Last Name"],
        country: item["House"],
        favorite_sport: item["Deporte"]
      }))

      return CsvModel.insertMany(army)
    })
    .then(() => {
      res.status(200).send({
        message: "Successfully Uploaded!"
      })
    })

  // Handle stream errors
  stream.on("error", (error) => {
    res.status(500).send({
      message: "failure",
      error
    })
  })
})


app.get("/api/users", async (req, res) => {
  const searchTerm = req.query.q

  if (!searchTerm) {
    return res.status(400).json({message: "No search term provided"})
  }

  try {
    const users = await CsvModel.find({
      $or: [
        {name: {$regex: searchTerm, $options: "i"}},
        {city: {$regex: searchTerm, $options: "i"}},
        {country: {$regex: searchTerm, $options: "i"}},
        {favorite_sport: {$regex: searchTerm, $options: "i"}}
      ]
    }).exec()

    res.status(200).json({data: users})
  } catch (error: any) {
    res
      .status(500)
      .json({message: "Error searching users", error: error.message})
  }
})





// mongoose.connect(
//   process.env.MONGO_URL!,
//   {useNewUrlParser: true, useUnifiedTopology: true},
//   (err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log("Connected to database!")
//     }
//   }
// )



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running cool on port ${port}`)
})