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
    console.log('\nConnected to the employees database\n\n==========================\n')
);

module.exports = db;