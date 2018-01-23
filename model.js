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
  location: String,
  temperature: Number,
  created: Date
}, { collection: 'observations' });

// models
module.exports = mongoose.model('LocationModel', locSchema);
module.exports = mongoose.model('EntryModel', locSchema);
