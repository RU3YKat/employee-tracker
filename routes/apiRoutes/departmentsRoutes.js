const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET a single department
router.get('/department/:id', (req, res) => {
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
router.delete('/department/:id', (req, res) => {
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
router.post('/department', ({ body }, res) => {
    const sql = `INSERT INTO departments (name)
    VALUES (?)`;
    const params = (body.name);

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
router.get('/departments', (req, res) => {
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

module.exports = router;
