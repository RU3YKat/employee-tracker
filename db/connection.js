const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // mySQL username
        user: 'root',
        // mySQL password
        password: 'ru3ykat-mySQL',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
);

module.exports = db;