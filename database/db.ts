import * as dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

export const pool = new Pool({
    user: process.env.USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
})
