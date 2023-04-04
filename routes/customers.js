const express = require('express');
const app = express();
const db = require('../data/db');

app.get('/customers', (req, res) => {
    db.query('SELECT * FROM CUSTOMERS WHERE IS_DELETED=0', (err, rows) => {
        res.send(rows);
    });
});

app.get('/getcustomer', (req, res) => {
    eksql = "";
    if (req.query.NAME != null) {
        eksql = eksql + " and NAME like '%" + req.query.NAME + "%'";
    }
    if (req.query.SURNAME != null) {
        eksql = eksql + " and SURNAME like '%" + req.query.SURNAME + "%'";
    }
    if (req.query.MAIL != null) {
        eksql = eksql + " and MAIL like '%" + req.query.MAIL + "%'";
    }
    console.log(eksql);
    db.query('SELECT * FROM CUSTOMERS WHERE IS_DELETED=0' + eksql, (err, rows) => {
        res.send(rows);
    });
});

app.get('/addcustomer', (req, res) => {
    NAME = req.query.NAME;
    SURNAME = req.query.SURNAME;
    MAIL = req.query.MAIL;
    PASSWORD = req.query.PASSWORD;
    PLATE_ID =req.query.PLATE_ID;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var CREATE_DATE = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;



    db.query("insert into CUSTOMERS (NAME,SURNAME,MAIL,PASSWORD,CREATE_DATE) values ('" + NAME + "', '" + SURNAME + "','" + MAIL + "','" + PASSWORD + "','" + CREATE_DATE + "' )", (err, rows) => {

        if (err) {
            res.send({ err, "message": "failed" });
        } else {
            ID = rows.insertId;

            db.query("insert into MATCH (USER_ID,PLATE_ID) values (" + ID + "," + PLATE_ID + ")", (err, rows) => {
                if (err) {
                    res.send({ err, "message": "failed" });
                } else {
                    res.send({ "message": "success" });

                }


            });
        }
    });
});

app.get('/updatecustomer', (req, res) => {
    ID = req.query.ID;
    NAME = req.query.NAME;
    SURNAME = req.query.SURNAME;
    MAIL = req.query.MAIL;
    PASSWORD = req.query.PASSWORD;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var UPDATE_DATE = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    db.query("update CUSTOMERS set NAME='" + NAME + "', SURNAME='" + SURNAME + "', MAIL='" + MAIL + "', PASSWORD='" + PASSWORD + "', UPDATE_DATE='" + UPDATE_DATE + "' where ID=" + ID, (err, rows) => {

        if (err) {
            res.send({ err, "message": "failed" });
        } else {
            res.send({ "message": "success" });
        }
    });
});

app.get('/deletecustomer', (req, res) => {
    ID = req.query.ID;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();

    var second = date.getSeconds();
    var UPDATE_DATE = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    db.query("update CUSTOMERS set IS_DELETED=1, UPDATE_DATE='" + UPDATE_DATE + "' where ID=" + ID, (err, rows) => {

        if (err) {
            res.send({ err, "message": "failed" });
        } else {
            res.send({ "message": "success" });
        }
    });
});

app.get('/login', (req, res) => {
    MAIL = req.query.MAIL;
    PASSWORD = req.query.PASSWORD;
    db.query("select * from CUSTOMERS where MAIL='" + MAIL + "' and PASSWORD='" + PASSWORD + "'", (err, rows) => {

        if (err) {
            res.send({ err, "message": "failed" });
        } else {
            if (rows.length > 0) {
                res.send({ "message": "success" });
            }
            else {
                res.send({ "message": "failed" });
            }
            
        }
    });
});



module.exports = app;