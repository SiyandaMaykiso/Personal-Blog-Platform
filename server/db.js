const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, // This line is updated to match the .env file
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
