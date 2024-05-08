// src/app/models/userModel.ts
import mongoose from "mongoose"

interface Card {
  name: string
  city: string
  country: string
  favorite_sport: string
}

const cardSchema = new mongoose.Schema<Card>({
  name: String,
  city: String,
  country: String,
  favorite_sport: String
})

const CardModel = mongoose.model<Card>("Card", cardSchema, 'cards')

export default CardModel
