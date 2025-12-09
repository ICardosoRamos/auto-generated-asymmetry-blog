import { Pool } from 'pg';
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, } = process.env;
const pool = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT || 5432),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});
export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();
