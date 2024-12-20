// import 'dotenv/config';

import pkg from 'pg';
const { Pool } = pkg; // Destructure Pool from the default export
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' })
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

export default pool;

