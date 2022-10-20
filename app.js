const express = require('express');
const app = express();
const students = require('./routes/students');
const orders = require('./orders');
const port = process.env.PORT || 3000;


app.get('/', (req, res) => res.send('Hello World!'));
app.use(students);
app.use(orders);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));