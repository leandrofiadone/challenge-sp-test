import {Request, Response} from "express"
import User from "../models/userModel"

export const searchUsers = async (req: Request, res: Response) => {
  const searchTerm = req.query.q?.toString().toLowerCase() || ""

  try {
    const users = await User.find({
      $or: [
        {name: {$regex: searchTerm, $options: "i"}},
        {city: {$regex: searchTerm, $options: "i"}},
        {country: {$regex: searchTerm, $options: "i"}},
        {favorite_sport: {$regex: searchTerm, $options: "i"}}
      ]
    })

    res.status(200).json({data: users})
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Error searching users."})
  }
}
