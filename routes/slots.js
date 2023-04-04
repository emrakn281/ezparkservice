const express = require('express');
const app = express();
const db = require('../data/db');

app.get('/slots', (req, res) => {
    db.query('SELECT * FROM productlines', (err, rows) => {
        res.send(rows);
    });
});

module.exports = app;