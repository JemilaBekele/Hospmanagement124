const Patient= require('../models/Patient')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const asyncWrapper= require('../middleware/async')

const createpatient =asyncWrapper( async (req, res) => {
  const registerstData = req.body;
  registerstData.createdBy = { 
    id: req.user.userId,
    name: req.user.firstName,
    namelast: req.user.lastName
  };
  
  const patient = await Patient.create(registerstData);
  res.status(StatusCodes.CREATED).json({ patient });
})

const getAllpatient= asyncWrapper(async (req, res) => {
  const patient = await Patient.find({})
  res.status(200).json({patient, patientCount: patient.length})
})

const getActivepatient = asyncWrapper(async (req, res) => {
  try {
    const patient = await Patient.find({ Status: 'Active' }); // Use 'Active' directly as a string
    res.status(200).json({ patient });
  } catch (error) {
    console.error('Error fetching active patients:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server Error' });
  }
});

const getsearchpatient = asyncWrapper(async (req, res) => {
  const { value: query } = req.params;
  try {
    const queryString = String(query);
    const patients = await Patient.find({
      $or: [
        { firstName: { $regex: queryString, $options: 'i' } }, // Search by first name
        { phoneNumber: { $regex: queryString, $options: 'i' } } // Search by phone number
      ]
    });
    res.status(200).json({ patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server Error' });
  }
});




const updatepatient =asyncWrapper( async(req, res)=>{
  const {params: {id:patientID}}= req
  const patient = await Patient.findOneAndUpdate({_id: patientID}, req.body, {
    new: true,
    runValidators: true
  })
  if(!patient){
    return res.status(404).json({msg:`no user id `})
  }
  res.status(200).json({patient})

})

const deletepatient = asyncWrapper(async(req, res)=>{
  const {id:patientID}= req.params
  const patient= await Patient.findOneAndDelete({_id: patientID})
  if(!patient){
    return res.status(404).json({msg:`no user eith id `})
  }
  res.status(200).json({patient})

})
const getpatient = asyncWrapper(async(req, res)=>{
  const {id:patientID}= req.params
  const patient= await Patient.findOne({_id: patientID})
  if(!patient){
    return res.status(404).json({msg:`no user eith id `})
  }
  res.status(200).json({patient})

})

const getdoctorpatient = asyncWrapper(async (req, res) => {
  // Assuming the doctor's ID is passed in the request
  const doctorId = req.user.userId; // Assuming the logged-in user's ID is stored in req.user.id

  try {
    // Fetch patients assigned to the logged-in doctor and populate MedicalInformation
    
    const patients = await Patient.find({ 'MedicalInformation.assigneddoctorTo': doctorId })
                                   .populate('MedicalInformation.assigneddoctorTo');

    res.status(200).json({  patients, patientCount: patients.length });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Error fetching patients" });
  }
});



module.exports = {
  createpatient,
  getAllpatient,
  updatepatient,
  deletepatient,
  getpatient,
  getActivepatient,
  getdoctorpatient,
  getsearchpatient
}

