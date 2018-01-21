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
}, { collection: 'location' });

const obsSchema = new Schema({
  location: String,
  temperature: Number,
  created: Date
}, { collection: 'observation' });

// models
module.exports = mongoose.model('Location', locSchema);
module.exports = mongoose.model('Entry', locSchema);
