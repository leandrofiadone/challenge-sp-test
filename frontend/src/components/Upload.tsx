import React, {useState} from "react"
import {fetchUsers} from "../../services"
import { User } from '../interfaces'

interface Props {
  onUpload: (users: User[]) => void
}

const Upload: React.FC<Props> = ({onUpload}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error("Failed to upload file")
      }

      const users = await response.json()
      onUpload(users.data)
    } catch (error) {
      console.error(error)
      // Handle upload error with user friendly message
    } finally {
      setSelectedFile(null)
    }
  }

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Upload
