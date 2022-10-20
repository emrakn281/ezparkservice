const express = require('express');
const app = express();
const db = require('../data/db');

app.get('/orders', (req, res) => {
    db.query('SELECT * FROM orders', (err, rows) => {
        res.send(rows);
    });
});

module.exports = app;