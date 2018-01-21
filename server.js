// server start -----------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const mongodb = 'mongodb://localhost/weatherapp';
mongoose.connect(mongodb);

app.use(express.static('public'));
app.use(require('./router.js'))

const port = 8080;
app.listen(port);
console.log(`Server port: ${port}`);
