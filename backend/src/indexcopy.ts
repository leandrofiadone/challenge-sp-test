import express from "express"
import multer from "multer"
import mongoose from "mongoose"
import csvParser from "csv-parser"
import cors from "cors"; // Import cors
var csv = require("csvtojson")

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

// Conexión a MongoDB
mongoose.connect(
  "mongodb+srv://leanfiadone:2G6u4n2umZUaYzY3@cluster0.75qkofa.mongodb.net/csv"
)

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected")
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})


// Esquema y modelo de Mongoose para los datos del CSV
const csvSchema = new mongoose.Schema({
  name: String,
  city: String,
  country: String,
  favorite_sport: String
})
const CsvModel = mongoose.model("CsvModell", csvSchema)

// Definir una interfaz para la estructura de tus datos CSV
interface CsvData {
  name: string
  city: string
  country: string
  favorite_sport: string
}


const upload = multer({storage: multer.memoryStorage()})

app.post("/api/files", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({message: "No se ha proporcionado ningún archivo."})
  }

  const results: CsvData[] = []
  const csvStream = csvParser()

  

  csvStream.on("error", (error) => {
    console.error("Error durante el procesamiento del CSV:", error)
    res.status(500).json({
      message: "Ocurrió un error durante el procesamiento del archivo CSV."
    })
  })
  csvStream
    .on("data", (data: CsvData) => {
      console.log("Processing data:", data)
      results.push(data)
      console.log("Results", results)
    })

    
    
    .on("end", () => {
        
      console.log("CSV processing ended")
      CsvModel.insertMany(results)
        .then(() => {
          console.log("Data inserted into MongoDB successfully")
          res.status(200).json({
            message:
              "Archivo CSV procesado y datos almacenados en MongoDB con éxito."
          })
        })
        .catch((error) => {
          console.error("Error inserting data into MongoDB:", error)
          res.status(500).json({
            message: "Error inserting data into MongoDB."
          })
        })
    })


  // Aquí es donde se pasa el buffer al csv-parser
  csvStream.write(req.file.buffer)
})



app.listen(port, () => {
  console.log(`Server running cool on port ${port}`)
})
