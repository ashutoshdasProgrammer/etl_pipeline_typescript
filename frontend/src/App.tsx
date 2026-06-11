import { useEffect, useState } from "react";
import Papa from "papaparse";
import FileUpload from "./components/FileUpload";

function App() {
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/social_network_ads.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setTableData(results.data as any[]);
          },
        });
      });
  }, []);

  const handleFileUpload = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setTableData(results.data as any[]);
      },
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>ETL Pipeline Dashboard</h1>

      <p>
        Upload a CSV file or view the default
        dataset.
      </p>

      <FileUpload
        onFileUpload={handleFileUpload}
      />

      {tableData.length > 0 && (
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            border={1}
            cellPadding={8}
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                {Object.keys(tableData[0]).map(
                  (key) => (
                    <th key={key}>{key}</th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {tableData.map(
                (row: any, index) => (
                  <tr key={index}>
                    {Object.values(row).map(
                      (
                        value: any,
                        i
                      ) => (
                        <td key={i}>
                          {String(value)}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;