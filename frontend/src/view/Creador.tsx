import React, {useState} from "react"
import {GoogleSpreadsheet} from "google-spreadsheet"

const CLIENT_ID: string = "TU_ID_DE_CLIENTE"
const API_KEY: string = "TU_API_KEY"
const SPREADSHEET_ID: string = "TU_ID_DE_HOJA_DE_CÁLCULO"

function Creador(): JSX.Element {
  const [csvData, setCsvData] = useState<string>("")

  const handleCreateCSV = async (): Promise<void> => {
    try {
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
      await doc.useApiKey(API_KEY)
      await doc.loadInfo()

      const sheet = doc.sheetsByIndex[0] // Suponiendo que es la primera hoja
      const rows = await sheet.getRows()

      const csvContent: string = rows
        .map((row: { _rawData: { [ s: string ]: unknown } | ArrayLike<unknown> }) => Object.values(row._rawData).join(","))
        .join("\n")
      setCsvData(csvContent)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div>
      <button onClick={handleCreateCSV}>Crear CSV</button>
      {csvData && (
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
          download="datos.csv">
          Descargar CSV
        </a>
      )}
    </div>
  )
}

export default Creador
