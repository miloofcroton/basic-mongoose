const express = require('express');
const app = express();

app.use(express.json());

const aircraft = require('./routes/aircraft');
app.use('/api/aircrafts', aircraft);

module.exports = app;
