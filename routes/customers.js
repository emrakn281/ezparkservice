const express = require('express');
const app = express();
const db = require('../data/db');

app.get('/customers', (req, res) => {
    db.query('SELECT * FROM CUSTOMERS', (err, rows) => {
        res.send(rows);
    });
});

app.get('/addcustomer', (req, res) => {
    NAME = req.query.NAME;
    SURNAME = req.query.SURNAME;
    MAIL = req.query.MAIL;
    PASSWORD = req.query.PASSWORD;
    //şuanki zamanı alıyoruz ve mysql formatına çeviriyoruz
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var CREATE_DATE = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

    db.query("insert into CUSTOMERS (NAME,SURNAME,MAIL,PASSWORD,CREATE_DATE) values ("+NAME+", "+SURNAME+","+MAIL+","+PASSWORD+",'"+CREATE_DATE+"' )", (err, rows) => {
    
        if (err) {
            res.send( {err, "message": "failed" });
        } else {
            res.send({ "message": "success" });
        }


    });
});
module.exports = app;