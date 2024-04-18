// App.jsx

import React, {useState, useEffect} from "react"
import Card from "./components/Card"
import {User} from "./interfaces"
import "./App.css" // Import CSS file for styling

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users?q=${searchTerm}`
        )
        const data = await response.json()
        setUsers(data.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [searchTerm])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    try {
      const formData = new FormData()
      if (selectedFile) {
        formData.append("file", selectedFile)
        const response = await fetch("http://localhost:3000/api/files", {
          method: "POST",
          body: formData
        })
        const data = await response.json()
        console.log(data.message)
        // Fetch data again after upload
      }
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  return (
    <div className="App">
      <h1>CSV Data Viewer</h1>
      <div className="input-container">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <input
        className='searchbar'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="cards-container">
        {users.map((user, index) => (
          <Card key={index} user={user} />
        ))}
      </div>
    </div>
  )
}

export default App

// import React, {useState, useEffect} from "react"
// import Upload from "./components/Upload"
// import Card from "./components/Card"
// import Search from "./components/Search"
// import {User} from "./interfaces"

// const App: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([])

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("/api/users") // Replace with your API endpoint
//       const data = await response.json()
//       setUsers(data)
//     }

//     fetchData()
//   }, [])

//   const handleUpload = (newUsers: User[]) => {
//     setUsers(newUsers)
//   }

// const filteredUsers = users.filter((user) => {
//   const searchTerm = /* Get search term from Search component state */;

//   if (!searchTerm) {
//     return true; // Show all users if no search term
//   }

//   // Implement case-insensitive search using toLowerCase()
//   const lowerSearchTerm = searchTerm.toLowerCase();
//   const lowerName = user.name.toLowerCase();

//   // Search by name (you can add more search criteria as needed)
//   return lowerName.includes(lowerSearchTerm);
// });

//   return (
//     <div className="App">
//       <h1>CSV Data Viewer</h1>
//       <Upload onUpload={handleUpload} />
//       <Search />
//       {filteredUsers.length > 0 ? (
//         <div className="cards">
//           {filteredUsers.map((user) => (
//             <Card key={user.name} user={user} /> // Pass user as props
//           ))}
//         </div>
//       ) : (
//         <p>No users uploaded or found in search.</p>
//       )}
//     </div>
//   )
// }

// export default App
