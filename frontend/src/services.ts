import axios from "axios"
import {User} from "./interfaces"

export async function fetchUsers(searchTerm?: string): Promise<{data: User[]}> {
  const url = searchTerm ? `/api/users?q=${searchTerm}` : "/api/users"

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch users")
  }
}
