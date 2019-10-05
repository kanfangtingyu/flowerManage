const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ThingsSchema = new Schema({
  thingname: {
    type: String
  },
  thingnumber: {
    type: Number
  },
  single: {
    type: Number
  },
  allmoney:{
    type:Number
  },
  expend: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Thing = mongoose.model('things', ThingsSchema);
