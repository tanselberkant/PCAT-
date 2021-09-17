const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Photo Scheme
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Creating Photo Model
const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo