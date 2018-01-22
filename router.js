// routes -----------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var models = require('./model.js');


app.get('/', (req, res) => {
    res.sendfile('./public/index.html')
});

app.get('/country', (req, res) => {
    res.sendFile(__dirname + '/public/country.html')
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/public/test.html')
});

// api -----------------------------------
app.get('/api/locdata', (req, res) => {
    models.find({}, 'country city', function(err, location) {
        if (err) {
            res.send(err);
        }
        res.json(location);
    });
});

app.get('/api/obsdata', (req, res) => {
    models.find(function(err, observation) {
        if (err) {
            res.send(err);
        }
        res.json(observation);
    });
});

module.exports = app;
