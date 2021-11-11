const express = require('express');
const PORT = process.env.PORT || 3009;
const app = express();
const mysql = require('mysql2');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello Massachusetts!'
    });
});

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'ru3ykat-mySQL',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
);

db.query(`SELECT * FROM departments`, (err, rows) => {
    console.log(rows);
});

// Default response for any other request (Not Found)
// Will override all other requests! Put at END!
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
