const asyncWrapper = require('../middleware/async');
const Patient = require('../models/Patient');
const Users = require('../models/Users') 
const createmedicaldata = asyncWrapper(async (req, res) => {
    const { patientID } = req.params;
    const medicalData = req.body;
  
    medicalData.createdBy = {
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
      if (requester.role !== 'nurse') {
        return res.status(403).json({ error: 'Only nurses can add patient information' });
      }
  
      // Find the doctor by name
        
      const doctorId = medicalData.assigneddoctorTo;
    const doctor = await Users.findOne({ _id: doctorId, role: 'doctor' });
  
      // Assign the doctor's _id to the medical data
      medicalData.assigneddoctorTo = doctor._id;
  
      // Add the medical data to the patient's MedicalInformation array
      patient.MedicalInformation.push(medicalData);
      await patient.save();
  
      res.status(200).json({ status: 'success', data: { medicalData } });
    } catch (error) {
      console.error('Error assigning medical data:', error);
      res.status(500).json({ error: 'Failed to assign medical data' });
    }
  });
  

  const getAllMedicalData = asyncWrapper(async (req, res) => {
    const { patientID } = req.params;

    try {
        // Find the patient data
        const patient = await Patient.findById(patientID);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Check if the requester is authorized to view medical data
        const requester = req.user;
        if (requester.role !== 'doctor' && requester.role !== 'nurse') {
            return res.status(403).json({ error: 'Only doctors and nurses can view patient medical data' });
        }

        // Retrieve the authenticated user's ID
        const userId = req.user.userId;

        // Retrieve medical data assigned to the authenticated user (doctor or nurse)
        const medicalData = patient.MedicalInformation.filter(data => {
            // Allow nurses to view medical data assigned to any doctor
            if (requester.role === 'nurse') {
                return !!data.assigneddoctorTo; // Return true if assigneddoctorTo is present
            }
            // Allow doctors to view medical data assigned to themselves
            return String(data.assigneddoctorTo) === userId;
        });

        res.status(200).json({ status: 'success', data: { medicalData } });
    } catch (error) {
        console.error('Error fetching medical data:', error);
        res.status(500).json({ error: 'Failed to fetch medical data' });
    }
});


const updateMedicalData = asyncWrapper(async (req, res) => {
    const { patientID, medicalDataID } = req.params;
    const updateData = req.body;

    try {
        // Find the patient data
        const patient = await Patient.findById(patientID);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Check if the medical data exists
        const medicalDataIndex = patient.MedicalInformation.findIndex(data => data._id.toString() === medicalDataID);
        if (medicalDataIndex === -1) {
            return res.status(404).json({ error: 'Medical data not found' });
        }

        // Check if the requester is authorized to update medical data
        const requester = req.user;
        if (requester.role !== 'doctor' && requester.role !== 'nurse') {
            return res.status(403).json({ error: 'Only doctors and nurses can update medical data' });
        }

        // Update the medical data
        patient.MedicalInformation[medicalDataIndex] = { ...patient.MedicalInformation[medicalDataIndex], ...updateData };
        await patient.save();

        res.status(200).json({ status: 'success', message: 'Medical data updated successfully' });
    } catch (error) {
        console.error('Error updating medical data:', error);
        res.status(500).json({ error: 'Failed to update medical data' });
    }
});



const deleteMedicalData = asyncWrapper(async (req, res) => {
    const { patientID, medicalDataID } = req.params;

    try {
        // Find the patient data
        const patient = await Patient.findById(patientID);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Check if the medical data exists
        const medicalDataIndex = patient.MedicalInformation.findIndex(data => data._id.toString() === medicalDataID);
        if (medicalDataIndex === -1) {
            return res.status(404).json({ error: 'Medical data not found' });
        }

        // Check if the requester is authorized to delete medical data
        const requester = req.user;
        if (requester.role !== 'doctor' && requester.role !== 'nurse') {
            return res.status(403).json({ error: 'Only doctors and nurses can delete medical data' });
        }

        // Remove the medical data from the patient's record
        patient.MedicalInformation.splice(medicalDataIndex, 1);
        await patient.save();

        res.status(200).json({ status: 'success', message: 'Medical data deleted successfully' });
    } catch (error) {
        console.error('Error deleting medical data:', error);
        res.status(500).json({ error: 'Failed to delete medical data' });
    }
});


const getOneMedicalData = asyncWrapper(async (req, res) => {
    const { patientID, medicalDataID } = req.params;

    try {
        // Find the patient data
        const patient = await Patient.findById(patientID);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Find the specific medical data record
        const medicalData = patient.MedicalInformation.find(data => data._id.toString() === medicalDataID);
        if (!medicalData) {
            return res.status(404).json({ error: 'Medical data not found' });
        }

        // Check if the requester is authorized to view medical data
        const requester = req.user;
        if (requester.role !== 'doctor' && requester.role !== 'nurse') {
            return res.status(403).json({ error: 'Only doctors and nurses can view patient medical data' });
        }

        res.status(200).json({ status: 'success', data: { medicalData } });
    } catch (error) {
        console.error('Error fetching medical data:', error);
        res.status(500).json({ error: 'Failed to fetch medical data' });
    }
});









module.exports = {
    createmedicaldata,
    getAllMedicalData,
    updateMedicalData,
    deleteMedicalData,
    getOneMedicalData
  }