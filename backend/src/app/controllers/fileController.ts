import {Request, Response} from "express"
import csvtojson from "csvtojson"
import User from "../models/cardModel"

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({message: "No file uploaded."})
    }

    const csvData = await csvtojson().fromFile(req.file.path)
    await User.insertMany(csvData)

    res.status(200).json({message: "The file was uploaded successfully."})
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Error uploading file."})
  }
}
