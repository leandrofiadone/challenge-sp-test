// App.tsx

import React from "react"
import {Route, Routes} from "react-router-dom"
import Importador from './view/Importador'
import NotFound from './view/NotFound'
import Creador from './view/Creador'
// Importa el componente NotFound

const App: React.FC = () => {
  return (
   
      <div>
        <Routes>
          <Route path="/" element={<Importador />} />
          <Route path="/creador" element={<Creador />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Ruta por defecto, muestra NotFound cuando ninguna ruta coincide */}
        </Routes>
      </div>

  )
}

export default App
