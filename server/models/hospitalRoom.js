// hospitalRoomModel.js
const mongoose = require('mongoose');

const HospitalRoomSchema = new mongoose.Schema({
  allowedTime: {
    type: Date,
    required: true,
  },
  dischargeTime: {
    type: Date,
    required: true,
  },
  bedroomNumber: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Please provide user'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('HospitalRoom', HospitalRoomSchema);
