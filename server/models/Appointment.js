// appointmentModel.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  appointmentID: {
    type: String, // Assuming AppointmentID can be a string, adjust as needed
    required: [true, 'Please provide AppointmentID'],
    unique: true,
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Assuming you have a Patient model, adjust as needed
    required: [true, 'Please provide PatientID'],
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Assuming you have a Doctor model, adjust as needed
    required: [true, 'Please provide DoctorID'],
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please provide AppointmentDate'],
  },
  appointmentTime: {
    type: String,
    required: [true, 'Please provide AppointmentTime'],
  },
  reasonForVisit: {
    type: String,
    required: [true, 'Please provide ReasonForVisit'],
  },
  symptoms: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  treatmentPlan: {
    type: String,
  },
  prescriptions: {
    type: String,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
