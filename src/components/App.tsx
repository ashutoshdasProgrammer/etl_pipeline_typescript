import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const App = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    fetch('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file: file.name }),
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {data.length > 0 && (
        <Line
          data={{
            labels: data.map((record) => record[0]),
            datasets: [
              {
                label: 'Data',
                data: data.map((record) => record[1]),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
};

export default App;