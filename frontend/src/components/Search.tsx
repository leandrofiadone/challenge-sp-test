import React, {useState, useEffect} from "react"
import {fetchUsers} from "../../services"
import { User } from '../interfaces'

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUsers(searchTerm)
      setUsers(response.data)
    }

    fetchData()
  }, [searchTerm])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Users"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default Search
