const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool to MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test the connection
promisePool.getConnection()
    .then(connection => {
        console.log('MySQL Database connected successfully.');
        connection.release();
    })
    .catch(err => {
        console.error('MySQL connection failed:', err.message);
    });

module.exports = promisePool;
