import dotenv from "dotenv";

let envFileName;

if (process.env.NODE_ENV === "production") {
  envFileName = ".docker.env";
} else if (process.env.NODE_ENV === "development") {

  envFileName = ".env";
}

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../" + envFileName) });

import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
});
