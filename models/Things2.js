const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Things2Schema = new Schema({
  index: {
    type: Number
  },
  name: {
    type: String
  },
  describe: {
    type: String
  }
});

module.exports = Thing = mongoose.model('things2', Things2Schema);
