const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Things3Schema = new Schema({
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

module.exports = Thing = mongoose.model('things3', Things3Schema);
