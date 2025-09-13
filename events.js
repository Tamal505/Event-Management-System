const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all events
router.get('/', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add event
router.post('/add', (req, res) => {
    const { name, date, location } = req.body;
    db.query('INSERT INTO events (name, date, location) VALUES (?, ?, ?)', 
    [name, date, location], (err) => {
        if (err) throw err;
        res.json({ message: 'Event added successfully' });
    });
});

module.exports = router;
