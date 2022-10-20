const mysql = require('mysql2');
const config = require('./config');


const db = mysql.createConnection(process.env.JAWSDB_URL || config.db);

db.connect((err) => {
    console.log('MySql Connected...');
});

module.exports = db;