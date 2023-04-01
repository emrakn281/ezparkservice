const express = require('express');
const app = express();
const db = require('../data/db');

app.get('/students', (req, res) => {
    id = req.query.id;
    console.log(id);
    if (id == undefined) {
        db.query('SELECT * FROM products', (err, rows) => {
            res.send(rows);
        });
    } else {
        db.query('SELECT * FROM products where productCode=' + id, (err, rows) => {
            res.send(rows);
        });
    }

});

module.exports = app;

