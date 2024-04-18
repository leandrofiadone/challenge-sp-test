import React from "react"

import {User} from "../interfaces"

interface Props {
  user: User
}

const Card: React.FC<Props> = ({user}) => {
  return (
    <div >
      <h2>{user.name}</h2>
      <p>City: {user.city}</p>
      <p>Country: {user.country}</p>
      <p>Favorite Sport: {user.favorite_sport}</p>
    </div>
  )
}

export default Card
