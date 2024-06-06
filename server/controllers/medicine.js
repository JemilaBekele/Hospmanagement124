const Medicine= require('../models/medicalstore')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const asyncWrapper= require('../middleware/async')

const createmedicine =asyncWrapper( async (req, res) => {

  const medicine = await Medicine.create(req.body)
  res.status(StatusCodes.CREATED).json({ medicine})
})

const getAllmedicine = asyncWrapper(async (req, res) => {
  const medicine = await Medicine.find({})
  res.status(200).json({ medicine, medicineCount: medicine.length})
})

const updatemedicine=asyncWrapper( async(req, res)=>{
  const {id:userID}= req.params
  const medicine = await Medicine.findOneAndUpdate({_id: userID}, req.body, {
    new: true,
    runValidators: true
  })
  if(!medicine ){
    return res.status(404).json({msg:`no medicine eith id `})
  }
  res.status(200).json({medicine})

})

const deletemedicine= asyncWrapper(async(req, res)=>{
  const {id:medicineID}= req.params
  const medicine= await Medicine.findOneAndDelete({_id: medicineID})
  if(!medicine){
    return res.status(404).json({msg:`no user eith id `})
  }
  res.status(200).json({medicine})

})
const getmedicine= asyncWrapper(async(req, res)=>{
  const {id:medicineID}= req.params
  const medicine= await Medicine.findOne({_id: medicineID})
  if(!medicine){
    return res.status(404).json({msg:`no user eith id `})
  }
  res.status(200).json({medicine})

})
module.exports = {
  createmedicine,
  getAllmedicine,
  updatemedicine,
  deletemedicine,
  getmedicine
}