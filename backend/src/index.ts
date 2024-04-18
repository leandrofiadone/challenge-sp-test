import express from "express"
import multer from "multer"

const app = express()
const port = process.env.PORT || 3000

// Configuración de multer para almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/") // Asegúrate de que este directorio exista
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".csv")
  }
})

const upload = multer({storage: storage})

app.post("/api/files", upload.single("file"), (req, res) => {
  try {
    // Procesamiento del archivo CSV y almacenamiento de datos...

    res.status(200).json({message: "El archivo se cargó correctamente"})
  } catch (error) {
    if (error instanceof Error) {
      // Ahora TypeScript sabe que 'error' es un Error y tiene una propiedad 'message'
      res.status(500).json({message: error.message})
    } else {
      // Si 'error' no es una instancia de Error, maneja el caso o reporta un mensaje genérico
      res.status(500).json({message: "Ocurrió un error desconocido"})
    }
  }
})

app.listen(port, () => {
  console.log(`Server running cool on port ${port}`)
})
