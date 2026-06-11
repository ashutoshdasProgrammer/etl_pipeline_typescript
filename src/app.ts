import express, { Request, Response } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App';
import { extractCSVData } from './extract/data.extract.code';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  const markup = ReactDOMServer.renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>My App</title>
      </head>
      <body>
        <div id="root">${markup}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

app.post('/upload', (req: Request, res: Response) => {
  const file = req.body.file;
  const records = extractCSVData(file);
  res.json(records);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});