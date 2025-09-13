const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'event_db'
});

db.connect((err) => {
  if(err) throw err;
  console.log('MySQL connected...');
});

// Get all events
app.get('/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

// Add new event
app.post('/events', (req, res) => {
  const { name, date, location } = req.body;
  db.query('INSERT INTO events (name, date, location) VALUES (?, ?, ?)', [name, date, location], (err, result) => {
    if(err) throw err;
    res.json({ message: 'Event added' });
  });
});

// Delete event
app.delete('/events/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM events WHERE id = ?', [id], (err, result) => {
    if(err) throw err;
    res.json({ message: 'Event deleted' });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
