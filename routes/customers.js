const express = require('express');
const app = express();
const db = require('../data/db');

app.get('/customers', (req, res) => {
    db.query('SELECT * FROM deneme', (err, rows) => {
        res.send(rows);
    });
});

app.get('/addcustomer', (req, res) => {
    productLine = req.query.productLine;
    textDescription = req.query.textDescription;
    db.query('insert into productlines (productLine,textDescription) values ('+productLine+', '+textDescription+')', (err, rows) => {
    
        if (err) {
            res.send( {err, "message": "failed" });
        } else {
            res.send({ "message": "success" });
        }


    });
});
module.exports = app;