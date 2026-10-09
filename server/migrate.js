const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: 'shopflow'
    });
    
    await connection.query(`
        CREATE TABLE IF NOT EXISTS Reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            user_id INT NOT NULL,
            rating INT NOT NULL,
            comment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
        );
    `);
    console.log('Reviews table created');
    process.exit(0);
}

migrate();
