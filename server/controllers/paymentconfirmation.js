// In your authController.js or wherever you handle authentication related endpoints

const Patient = require('../models/Patient');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

// Endpoint to fetch users awaiting confirmation
const paymentAwaitingConfirmation = async (req, res) => {
    try {
        // Query patients where MedicalData's paid field is false
        const unpaidPatients = await Patient.find({ 'MedicalData.paid': false });
    
        // If no unpaid patients found, return empty array
        if (!unpaidPatients) {
          return res.status(200).json({ message: 'No unpaid patients found' });
        }
    
        // If unpaid patients found, return them
        res.status(200).json({ unpaidPatients });
      } catch (error) {
        console.error('Error fetching unpaid patients:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

// Endpoint to confirm user registration
const confirmPayment = async (req, res) => {
    try {
        // Extract patient ID and medicalData ID from request parameters
        const { patientId, medicalDatadocID } = req.params;
        const { paid } = req.body;
    
        // Find patient by ID
        const patient = await Patient.findById(patientId);
    
        // If patient not found, return 404
        if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
        }
    
        // Find index of MedicalData with provided ID
        const medicalDataIndex = patient.MedicalData.findIndex(
          (data) => data._id == medicalDatadocID
        );
    
        // If MedicalData not found, return 404
        if (medicalDataIndex === -1) {
          return res.status(404).json({ error: 'MedicalData not found' });
        }
    
        // Update paid status of MedicalData
        patient.MedicalData[medicalDataIndex].paid = paid;
    
        // Save patient with updated MedicalData
        await patient.save();
    
        // Return success response
        res.status(200).json({ message: 'Paid status updated successfully' });
      } catch (error) {
        console.error('Error updating paid status:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

//lab start phase find
const Labstartphase = async (req, res) => {
  try {
      // Query patients where MedicalData's paid field is false
      const labstart = await Patient.find({ 'MedicalData.LabStatus': 'start' });
  
      // If no unpaid patients found, return empty array
      if (!labstart) {
        return res.status(200).json({ message: 'No unpaid patients found' });
      }
  
      // If unpaid patients found, return them
      res.status(200).json({ labstart });
    } catch (error) {
      console.error('Error fetching unpaid patients:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const Labprogressphase = async (req, res) => {
  try {
      // Query patients where MedicalData's paid field is false
      const labprogress = await Patient.find({ 'MedicalData.LabStatus': 'Progress' });
  
      // If no unpaid patients found, return empty array
      if (!labprogress) {
        return res.status(200).json({ message: 'No progress patients found' });
      }
  
      // If unpaid patients found, return them
      res.status(200).json({ labprogress });
    } catch (error) {
      console.error('Error fetching unpaid patients:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const Labendphase = async (req, res) => {
  try {
      // Query patients where MedicalData's paid field is false
      const labend = await Patient.find({ 'MedicalData.LabStatus': 'end' });
  
      // If no unpaid patients found, return empty array
      if (!labend) {
        return res.status(200).json({ message: 'No end patients found' });
      }
  
      // If unpaid patients found, return them
      res.status(200).json({ labend });
    } catch (error) {
      console.error('Error fetching unpaid patients:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const updatelabstatus = async (req, res) => {
  try {
      // Extract patient ID and medicalData ID from request parameters
      const { patientId, medicalDatadocID } = req.params;
      const { LabStatus } = req.body;
  
      // Find patient by ID
      const patient = await Patient.findById(patientId);
  
      // If patient not found, return 404
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Find index of MedicalData with provided ID
      const medicalDataIndex = patient.MedicalData.findIndex(
        (data) => data._id == medicalDatadocID
      );
  
      // If MedicalData not found, return 404
      if (medicalDataIndex === -1) {
        return res.status(404).json({ error: 'MedicalData not found' });
      }
  
      // Update paid status of MedicalData
      patient.MedicalData[medicalDataIndex].LabStatus = LabStatus;
  
      // Save patient with updated MedicalData
      await patient.save();
  
      // Return success response
      res.status(200).json({ message: 'Paid status updated successfully' });
    } catch (error) {
      console.error('Error updating paid status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { paymentAwaitingConfirmation, confirmPayment, Labstartphase,Labprogressphase ,Labendphase,updatelabstatus};
