const { Schema, model } = require("mongoose");

const TimelineSchema = new Schema({
  'DisNo': Object,
  'DisasterSubgroup': String,
  'DisasterType': String,
  'DisasterSubtype': String,
  'Country': String,
  'Subregion': String,
  'Region': String,
  'Location': String,
  'StartYear': Number,
  'StartMonth': Number,
  'StartDay': Number,
  'EndYear': Number,
  'EndMonth': Number,
  'EndDay': Number,
  'TotalDeaths': Number,
  'NoInjured': Number,
  'NoAffected': Number,
  'NoHomeless': Number,
  'TotalAffected': Number,
}, { collection: 'Timeline' });

const Timeline = model('Timeline', TimelineSchema);

module.exports = Timeline;
