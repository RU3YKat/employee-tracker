const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all roles (shows job title, role id, department name role belongs to, salary)
router.get('/roles', (req, res) => {
    const sql = `SELECT roles.*, departments.name
        AS department_name
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id`;

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

// Get role by id
router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
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

// Create a role
router.post('/role', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'New role was added successfully',
            data: body
        });
    });
});

// Delete a role
router.delete('/roles/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE ID = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        // Prevents deletion of role that DNE
        } else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
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

module.exports = router;