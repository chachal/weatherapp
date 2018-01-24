// routes -----------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var models = require('./model.js');
var Locations = models.LocationModel;
var Observations = models.ObservationModel;
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/location', (req, res) => {
    res.sendFile(__dirname + '/public/location.html')
});


// api -----------------------------------
app.get('/api/locdata', (req, res) => {
    Locations.find({}, 'country city', function(err, locationData) {
        if (err) {
            res.send(err);
        }
        res.json(locationData);
    });
});

app.post('/api/obsdata', (req, res, next) => {
    var entry = new Observations(req.body);
    entry.save(function(err, post) {
        if (err) {
            return next(err)
        }
        res.status(201).json(entry)
    })
});

module.exports = app;
