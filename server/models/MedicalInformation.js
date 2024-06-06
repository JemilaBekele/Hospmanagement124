const mongoose = require('mongoose');

const MedicalData = new mongoose.Schema({
  AreaDiscomfort : {
    type: String,
  },
  OnsetDiscomfort: {
    type: String,
  },
  Frequencypian: {
    type: String,
    enum: ['constant', 'off/on', 'at rest', 'with activity', 'other'],
  },
  Daypain: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'during sleep', 'other'],
  },
  Releatedtreatment: {
    type: String,
  },
  increasedecreasepain: {
    type: String,
  },
  symptoms: {
    type: String,
  },
  Clinicalchemistry: {
    type: String,
  },
  Urinalysis: {
    type: String,
  },
  serology: {
    type: String,
  },
  bacteriology: {
    type: String,
  },
  hormonalassay: {
    type: String,
  },
  coagulation: {
    type: String,
  },
  stoolexamination: {
    type: String,
  },
  electrolytepanel: {
    type: String,
  },
  hematology: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Please provide user'],
  },e

}, {
  timestamps: true,
});

module.exports = mongoose.model('MedicalData', MedicalData);
