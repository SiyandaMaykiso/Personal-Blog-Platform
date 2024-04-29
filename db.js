const { Pool } = require('pg');
require('dotenv').config();

let poolConfig;

if (process.env.NODE_ENV === 'production') {
    // In production on Heroku, use DATABASE_URL
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        // Ensuring SSL connection is required for secure connection to Heroku Postgres
        ssl: {
            rejectUnauthorized: false // Necessary to avoid "self-signed certificate" errors
        }
    };
} else {
    // In development, use details from .env file
    poolConfig = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    };
}

const pool = new Pool(poolConfig);

module.exports = pool;
