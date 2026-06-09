
/**
 * - the code is to extract the csv file data and clean it.
 * - return type -> [userid, gender, age, estimatedSalary, purchased]
 * 
 */

import fs from 'node:fs';
import path from "node:path";
import { fileURLToPath } from 'node:url';

console.log("hello from extract")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const csv_path = path.resolve(__dirname, '../data/User_data.csv');

export interface UserDataRow{
    userId: string,
    gender: string,
    age: number,
    estimatedSalary: number,
    purchased: boolean;
}

/**
 * - read and parse the user_data.csv file into structured JSON objects.
 * 
 */

export function extractCSVData(): UserDataRow[] {
    const fileContent = fs.readFileSync(csv_path, 'utf-8');

    /**
     * - contains each line of the file.
     * - stores the data in array format
     * - userID, gender, age, estimaredSalary, purchased
     */
    const lines = fileContent.trim().split(/\r?\n/);
    console.log(lines);
    if(lines.length <= 1)
        return [];

    /**
     * -parse lines skipping the header row
     */
    const rows:UserDataRow[] = [];
    for(let i=1; i<lines.length; i++){
        const line = lines[i]?.trim();
        if(!line)
            continue;
        const parts = line.split(',');
        if(parts.length < 5)
            continue;
        const [userId, gender, ageStr, salaryStr, purchasedStr] = parts;

        rows.push({
            userId: userId!.trim(),
            gender: gender!.trim(),
            age: parseInt(ageStr!.trim(), 10),
            estimatedSalary: parseInt(salaryStr!.trim(), 10),
            purchased: purchasedStr!.trim() === '1',
        });
    }

    return rows;

}

