import * as fs from 'fs';
import * as path from 'path';

export function extractCSVData(file: string): any[] {
  const filePath = path.join(__dirname, '../../data', file);
  const data = fs.readFileSync(filePath, 'utf8');
  const records = data.split('\n').map((line) => line.split(','));
  return records;
}