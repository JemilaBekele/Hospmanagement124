const asyncWrapper = require('../middleware/async');
const Patient = require('../models/Patient');
const Users = require('../models/Users') 
const createmedicaldatadoc = asyncWrapper(async (req, res) => {
    const { patientID } = req.params;
    const medicalDatadoctor = req.body;
  
    medicalDatadoctor.createdBy = {
      id: req.user.userId,
      name: req.user.firstName,
      namelast: req.user.lastName
    };
  
    try {
      // Find the patient data
      const patient = await Patient.findById(patientID);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Check if the requester is a nurse
      const requester = req.user;
      if (requester.role !== 'doctor') {
        return res.status(403).json({ error: 'Only doctor can add patient information' });
      }  
      // Add the medical data to the patient's MedicalInformation array
      patient.MedicalData.push(medicalDatadoctor);
      await patient.save();
  
      res.status(200).json({ status: 'success', data: { medicalDatadoctor } });
    } catch (error) {
      console.error('Error assigning medical data:', error);
      res.status(500).json({ error: 'Failed to assign medical data' });
    }
  });

  const getAllMedicalDatadoc = asyncWrapper(async (req, res) => {
    const { patientID } = req.params;

    try {
        // Find the patient data
        const patient = await Patient.findById(patientID);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Check if the requester is authorized to view medical data
      

        // Retrieve medical data assigned to the authenticated user (doctor or nurse)
        const medicalDatadoc = patient.MedicalData;

        res.status(200).json({ status: 'success', data: { medicalDatadoc } });
    } catch (error) {
        console.error('Error fetching medical data:', error);
        res.status(500).json({ error: 'Failed to fetch medical data' });
    }
});

const updateMedicalDatadoc = asyncWrapper(async (req, res) => {
    const { patientID, medicalDatadocID } = req.params;
    const updateData = req.body;

    try {
        // Find the patient data
        const patient = await Patient.findById(patientID);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Check if the medical data exists
        const medicalDataIndex = patient.MedicalData.findIndex(data => data._id.toString() === medicalDatadocID);
        if (medicalDataIndex === -1) {
            return res.status(404).json({ error: 'Medical data not found' });
        }

        // Check if the requester is authorized to update medical data
        const requester = req.user;
        if (requester.role !== 'doctor' && requester.role !== 'nurse') {
            return res.status(403).json({ error: 'Only doctors and nurses can update medical data' });
        }

        // Update the medical data
        patient.MedicalData[medicalDataIndex] = { ...patient.MedicalData[medicalDataIndex], ...updateData };
        await patient.save();

        res.status(200).json({ status: 'success', message: 'Medical data updated successfully' });
    } catch (error) {
        console.error('Error updating medical data:', error);
        res.status(500).json({ error: 'Failed to update medical data' });
    }
});


const deleteMedicalDatadoc = asyncWrapper(async (req, res) => {
    const { patientID, medicalDatadocID } = req.params;

    try {
        // Find the patient data
        const patient = await Patient.findById(patientID);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Check if the medical data exists
        const medicalData = patient.MedicalData.findIndex(data => data._id === medicalDatadocID);
        if (!medicalData) {
            return res.status(404).json({ error: 'Medical data not found' });
        }

        // Check if the requester is authorized to delete medical data
        const requester = req.user;
        if (requester.role !== 'doctor' && requester.role !== 'nurse') {
            return res.status(403).json({ error: 'Only doctors and nurses can delete medical data' });
        }

        // Remove the medical data from the patient's record
        patient.MedicalData = patient.MedicalData.filter(data => data._id.toString() !== medicalDatadocID);
        await patient.save();

        res.status(200).json({ status: 'success', message: 'Medical data deleted successfully' });
    } catch (error) {
        console.error('Error deleting medical data:', error);
        res.status(500).json({ error: 'Failed to delete medical data' });
    }
});


const getDocId = asyncWrapper(async (req, res) => {
    const { patientID, medicalDatadocID } = req.params;

    try {
        // Find the patient data
        const patient = await Patient.findById(patientID);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Find the specific medical data record
        const medicalData = patient.MedicalData.find(data => data._id.toString() === medicalDatadocID);
        if (!medicalData) {
            return res.status(404).json({ error: 'Medical data not found' });
        }

        // Extract the doctor id from createdBy
        const doctorId = medicalData.createdBy[0].id;

        // Send the doctor id in the response
        res.status(200).json({ status: 'success', data: { doctorId } });
    } catch (error) {
        console.error('Error fetching medical data:', error);
        res.status(500).json({ error: 'Failed to fetch medical data' });
    }
});


  module.exports = {
    createmedicaldatadoc,
    getAllMedicalDatadoc,
    updateMedicalDatadoc,
    deleteMedicalDatadoc,
    getDocId
    
  }