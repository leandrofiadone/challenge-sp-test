import React from "react"
import {User} from "../interfaces"
import "./Card.css" // Import CSS file for styling

interface Props {
  user: User
}

const Card: React.FC<Props> = ({user}) => {
  return (
    <div className="card">
      <h2 className="text-2xl font-semibold">{user.name}</h2>
      <p>City: {user.city}</p>
      <p>Country: {user.country}</p>
      <p>Favorite Sport: {user.favorite_sport}</p>
    </div>
  )
}

export default Card
