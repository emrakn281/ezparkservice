const express = require('express');
const app = express();
const db = require('./db');

app.get('/orders', (req, res) => {
    db.query('SELECT * FROM orders', (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = app;