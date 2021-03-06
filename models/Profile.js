const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  thingname: {
    type: String
  },
  thingnumber: {
    type: String
  },
  single: {
    type: Number,
  },
  number: {
    type: Number,
  },
  allnumber: {
    type: Number,
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
