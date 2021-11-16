const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employee ORDER BY last_name`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

// Get single employee
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`;
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

// Update employee
router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
            message: 'Employee not found'
            });
        } else {
            res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
            });
        }
    });
});

router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
            message: 'Employee not found'
            });
        } else {
            res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
            });
        }
    });
});

// Create a new employee
router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name) 
    VALUES (?,?)`;
    const params = [body.first_name, body.last_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

module.exports = router;