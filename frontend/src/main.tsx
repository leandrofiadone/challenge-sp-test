import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom" // Importa BrowserRouter
import App from "./App.tsx"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* Wrap your App component with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
