import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "etl_db",
});

async function testConnection() {
  try {
    await client.connect();

    console.log("✅ Connected to PostgreSQL");

    const result = await client.query("SELECT NOW()");

    console.log(result.rows);

    await client.end();
  } catch (error) {
    console.error(error);
  }
}

testConnection();