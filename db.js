const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // XAMPP default user
    password: '',       // XAMPP default password is empty
    database: 'eventdb'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL Database');
    }
});

module.exports = db;
