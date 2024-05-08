import {Request, Response} from "express"
import Card from "../models/cardModel"

export const searchCards = async (req: Request, res: Response) => {
  const searchTerm = req.query.q?.toString().toLowerCase() || ""

  try {
    const cards = await Card.find({
      $or: [
        {name: {$regex: searchTerm, $options: "i"}},
        {city: {$regex: searchTerm, $options: "i"}},
        {country: {$regex: searchTerm, $options: "i"}},
        {favorite_sport: {$regex: searchTerm, $options: "i"}}
      ]
    })

    res.status(200).json({data: cards})
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Error searching users."})
  }
}
