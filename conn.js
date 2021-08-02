const Pool = require("pg").Pool
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    database:process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

module.exports = pool;