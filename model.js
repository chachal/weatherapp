// schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locSchema = new Schema({
  locID: Schema.ObjectId,
  country: String,
  city: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  }
}, { collection: 'locations' });

const obsSchema = new Schema({
  city: String,
  country: String,
  temperature: Number,
  created: Date
}, { collection: 'observations' });

// models
var LocationModel = mongoose.model('LocationModel', locSchema);
var ObservationModel = mongoose.model('ObservationModel', obsSchema);

module.exports = { 'LocationModel': LocationModel, 'ObservationModel': ObservationModel }
