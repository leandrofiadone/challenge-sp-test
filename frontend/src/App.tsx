import React, {useState, useEffect} from "react"
import Card from "./components/Card"
import {User} from "./interfaces"

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

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
  }, [searchTerm]) // Fetch data when searchTerm changes

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="App">
      <h1>CSV Data Viewer</h1>
      {/* Map through the fetched data and render Card component for each user */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {users.map((user, index) => (
        <Card key={index} user={user} />
      ))}
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
