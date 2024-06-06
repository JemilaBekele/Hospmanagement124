const express= require('express')
const router= express.Router()

const {
    createmedicaldatadoc,
    getAllMedicalDatadoc,
    updateMedicalDatadoc,
    deleteMedicalDatadoc,
    getDocId
    
  }= require('../controllers/medicalData')


router.route('/medicine/:patientID').post(createmedicaldatadoc).get(getAllMedicalDatadoc)
router.route('/medicine/:patientID/fix/:medicalDatadocID').patch(updateMedicalDatadoc).delete(deleteMedicalDatadoc)
router.route('/medicine/:patientID/docid/:medicalDatadocID').get(getDocId)


module.exports= router
