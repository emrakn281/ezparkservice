const express = require('express');
const app = express();
const db = require('../data/db');

app.get('/plates', (req, res) => {
    db.query('SELECT * FROM PLATES', (err, rows) => {
        res.send(rows);
    });
});

app.get('/getplate', (req, res) => {
    eksql = "";
    if (req.query.ID != null) {
        eksql = eksql + " and ID = " + req.query.ID;
    }
    if (req.query.PLATE != null) {
        eksql = eksql + " and PLATE like '%" + req.query.PLATE + "%'";
    }

    console.log(eksql);
    db.query('SELECT * FROM PLATES WHERE IS_ACTIVE=1' + eksql, (err, rows) => {
        res.send(rows);
    });
});

app.get('/addplate', (req, res) => {
    PLATE = req.query.PLATE;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var CREATE_DATE = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    db.query("insert into PLATES (PLATE,CREATE_DATE,IS_ACTIVE) values ('" + PLATE + "', '" + CREATE_DATE + "',1)", (err, rows) => {
        if (err) {
            res.send({ err, "message": "failed" });
        } else {
            res.send({ "message": "success" });
        }
    });
});

app.get('/matchplate', (req, res) => {
    MAIL = req.query.MAIL;
    PASSWORD = req.query.PASSWORD;
    PLATE_ID = req.query.PLATE_ID;
    db.query("select * from CUSTOMERS where MAIL='" + MAIL + "' and PASSWORD='" + PASSWORD + "'", (err, rows) => {
        if (err) {
            res.send({ err, "message": "failed" });
        } else {
            if (rows.length > 0) {
                USER_ID = rows[0].ID;
                db.query("insert into MATCH (USER_ID,PLATE_ID) values (" + USER_ID + "," + PLATE_ID + ")", (err, rows) => {
                    if (err) {
                        res.send({ err, "message": "failed" });
                    } else {
                        res.send({ "message": "success" });
                    }
                });
            } else {
                res.send({ "message": "failed" });
            }
        }
    });
});

module.exports = app;