const HospitalRoom = require('../models/hospitalRoom') // Adjust the path accordingly
const { StatusCodes } = require('http-status-codes')
const asyncWrapper= require('../middleware/async')
// Create a new hospital room

// Get all hospital rooms
const createHospitalRoom =asyncWrapper( async (req, res) => {
  req.body.createdBy = req.user.userId
  req.body.patient = req.body.patientID
  const room = await HospitalRoom.create(req.body)
  res.status(StatusCodes.CREATED).json({ room})
})

const getAllHospitalRooms= asyncWrapper(async (req, res) => {
  const room = await HospitalRoom.find({})
  res.status(200).json({room})
})

const updateHospitalRooms = asyncWrapper(async (req, res) => {
  const {
    params: { id: roomID },
    user: { userId },
  } = req;
  const room = await HospitalRoom.findOneAndUpdate(
    { _id: roomID, createdBy: userId },
    req.body,
    { new: true,
      runValidators: true,
    }
  );
  if (!room) {
    return res.status(404).json({ msg: `No room with ID ${roomID} found.` });
  }
  res.status(200).json({ room });
});

const deleteHospitalRooms = asyncWrapper(async(req, res)=>{
  const {id:roomId}= req.params
  const room= await HospitalRoom.findOneAndDelete({_id: roomId})
  if(!room){
    return res.status(404).json({msg:`no user eith id `})
  }
  res.status(200).json({room})

})
const getHospitalRoomById = asyncWrapper(async(req, res)=>{
  const {id:roomId}= req.params
  const room= await HospitalRoom.findOne({_id: roomId})
  if(!room){
    return res.status(404).json({msg:`no user eith id `})
  }
  res.status(200).json({room})

})

module.exports = {
  createHospitalRoom,
  getAllHospitalRooms,
  getHospitalRoomById,
  updateHospitalRooms,
  deleteHospitalRooms
};
