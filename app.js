const express = require('express');
const app = express();
const plates = require('./routes/plates');
const customers = require('./routes/customers');
const entries = require('./routes/entries');
const slots = require('./routes/slots');

const port = process.env.PORT || 3000;


app.get('/', (req, res) => res.send('Hello World!'));
app.use(express.static('data'));
app.use(express.static('routes'));
app.use(plates);
app.use(customers);
app.use(entries);
app.use(slots);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));