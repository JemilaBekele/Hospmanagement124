const express= require('express')
const router= express.Router()

const {createpatient,
    getAllpatient,
    updatepatient,
    deletepatient,
    getpatient,
    getActivepatient,
    getdoctorpatient,
    getsearchpatient

    }= require('../controllers/patient')
const {
  createHospitalRoom,
  getAllHospitalRooms,
  getHospitalRoomById,
  updateHospitalRooms,
  deleteHospitalRooms,
  
}  = require('../controllers/hospitalRoom')  

router.route('/').post(createpatient).get(getAllpatient)
router.route('/active').get(getActivepatient)
router.route('/search/:value').get(getsearchpatient)
router.route('/fordoc').get(getdoctorpatient)
router.route('/room').post(createHospitalRoom).get(getAllHospitalRooms)
router.route('/room/:id').get(getHospitalRoomById).patch(updateHospitalRooms).delete(deleteHospitalRooms)
router.route('/get/:id').patch(updatepatient).delete(deletepatient).get(getpatient)


module.exports= router
