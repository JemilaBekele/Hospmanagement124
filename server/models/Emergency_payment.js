const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    
  },
 
});

const MedicalInsuranceSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  policyNumber: {
    type: String,
    required: true,
  },
  // Add other fields as needed
 });

 


module.exports = {
  EmergencyContact: mongoose.model('EmergencyContact', EmergencyContactSchema),
  MedicalInsurance: mongoose.model('MedicalInsurance', MedicalInsuranceSchema),


};
