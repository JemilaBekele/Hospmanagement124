const mongoose = require('mongoose');

const LaboratoryReport = new mongoose.Schema({
    patientId: {
    type: mongoose.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Please provide patient ID'],
  },
  
  medicalDatadocID: {
    type: mongoose.Types.ObjectId,
    ref: 'MedicalData',
    required: [true, 'Please provide medical data ID'],
  },
  laboratoryTests: {
    type: [String],
    required: [true, 'Please provide laboratory tests'],
  },
  laboratoryFindings: {
    type: String,
    required: [true, 'Please provide laboratory findings'],
  },
  comments: {
    type: String,
  },
  createdBy: {
    id: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Please provide user ID'],
    },
    name: {
      type: String,
      required: [true, 'Please provide sender name'],
    },
    namelast: {
      type: String,
      required: [true, 'Please provide sender name'],
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('LaboratoryReport', LaboratoryReport);
