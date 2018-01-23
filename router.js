// routes -----------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var models = require('./model.js');


app.get('/', (req, res) => {
    res.sendfile('./public/index.html')
});

app.get('/location', (req, res) => {
    res.sendFile(__dirname + '/public/location.html')
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/public/test.html')
});

// api -----------------------------------
app.get('/api/locdata', (req, res) => {
    models.find({}, 'country city', function(err, locationData) {
        if (err) {
            res.send(err);
        }
        res.json(locationData);
    });
});

app.get('/api/obsdata', (req, res) => {
    models.find(function(err, observationData) {
        if (err) {
            res.send(err);
        }
        res.json(observationData);
    });
});

module.exports = app;
