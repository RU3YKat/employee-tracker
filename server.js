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

// GET a single department
app.get('/api/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params,(err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a department
app.delete('/api/department/:id', (req, res) => {
    const sql = `DELETE FROM departments WHERE ID = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        // Prevents deletion of department that DNE
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'Successfully deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a department
app.post('/api/department', ({ body }, res) => {
    const sql = `INSERT INTO departments (dept_name)
    VALUES (?)`;
    const params = (body.dept_name);

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'New department was added successfully.',
            data: body
        });
    });
});

// Get all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'success',
            data: rows
        });
    });
});

// Default response for any other request (Not Found)
// Will override all other requests! Put at END!
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
