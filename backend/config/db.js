require('dotenv').config({path:'./.env'});
const mysql = require('mysql2');
console.log(process.env.DB_USERNAME);

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust as needed
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    
    console.log('Connected to the database');
    
    // Once done with the connection, release it back to the pool
    connection.release();
});
module.exports = pool.promise();