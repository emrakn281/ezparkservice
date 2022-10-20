const express = require('express');
const app = express();
const db = require('../data/db');

app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = app;