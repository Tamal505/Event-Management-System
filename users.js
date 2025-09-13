const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add user
router.post('/add', (req, res) => {
    const { username, role } = req.body;
    db.query('INSERT INTO users (username, role) VALUES (?, ?)', 
    [username, role], (err) => {
        if (err) throw err;
        res.json({ message: 'User added successfully' });
    });
});

module.exports = router;
