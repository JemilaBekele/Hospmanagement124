const MedicalInformation= require('../models/MedicalInformation')
const Patient= require('../models/Patient')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const asyncWrapper= require('../middleware/async')

const createmedical =asyncWrapper( async (req, res) => {
  const PatientData = req.body;
  req.body.createdBy = req.user.userId
  const assignedPatient= await Patient.findOne( PatientData.AssignedTo );
  if (!assignedPatient) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Assigned user is not found' });
  }
  PatientData.AssignedTo = {
    id: assignedPatient._id
  };
  const medical = await MedicalInformation.create(PatientData)
  res.status(StatusCodes.CREATED).json({ medical})
})

const getAllmedical= asyncWrapper(async (req, res) => {
  const medical = await MedicalInformation.find({})
  res.status(200).json({medical, patientCount: medical.length})
})

const updatemedical =asyncWrapper( async(req, res)=>{
  const {params: {id:userID}, user: { userId },}= req
  const medical = await MedicalInformation.findOneAndUpdate({_id: userID, createdBy: userId}, req.body, {
    new: true,
    runValidators: true
  })
  if(!medical){
    return res.status(404).json({msg:`no medicine eith id `})
  }
  res.status(200).json({medical})

})

const deletemedical = asyncWrapper(async(req, res)=>{
  const {id:medicalID}= req.params
  const medical= await MedicalInformation.findOneAndDelete({_id: medicalID})
  if(!medical){
    return res.status(404).json({msg:`no user eith id `})
  }
  res.status(200).json({medical})

})
const getmedical = asyncWrapper(async(req, res)=>{
  const {id:medicalID}= req.params
  const medical= await MedicalInformation.findOne({_id: medicalID})
  if(!medical){
    return res.status(404).json({msg:`no user eith id `})
  }
  res.status(200).json({medical})

})




module.exports = {
  createmedical,
  getAllmedical,
  updatemedical,
  deletemedical,
  getmedical
}