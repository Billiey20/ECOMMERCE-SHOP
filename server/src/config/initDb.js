const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function setupDatabase() {
    console.log('Connecting to MySQL...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        multipleStatements: true
    });

    console.log('Initializing shopflow database...');
    await connection.query('CREATE DATABASE IF NOT EXISTS shopflow;');
    await connection.query('USE shopflow;');

    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    if (fs.existsSync(schemaPath)) {
        console.log('Executing schema.sql...');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await connection.query(schemaSql);
    }

    const seedPath = path.join(__dirname, '../../database/seed.sql');
    if (fs.existsSync(seedPath)) {
        console.log('Executing seed.sql...');
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await connection.query(seedSql);
    }

    console.log('Database successfully initialized and seeded!');
    await connection.end();
}

setupDatabase().catch(err => {
    console.error('Database setup failed:', err.message);
    process.exit(1);
});
