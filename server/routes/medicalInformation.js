const express= require('express')
const router= express.Router()

const {
  createmedicaldata,
  getAllMedicalData,
  updateMedicalData,
  deleteMedicalData,
  getOneMedicalData
    
  }= require('../controllers/Nursemedicalinformation')


router.route('/medicine/:patientID').post(createmedicaldata).get(getAllMedicalData)
router.route('/medicine/:patientID/update/:medicalDataID').patch(updateMedicalData).delete(deleteMedicalData).get(getOneMedicalData)


module.exports= router
