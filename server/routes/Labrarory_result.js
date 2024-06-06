const express= require('express')
const router= express.Router()

const { createLaboratoryReport, 
    getLaboratoryReportById,
    updateLaboratoryReportById,
    deleteLaboratoryReportById
}= require('../controllers/Labrarory_result')


router.route('/labtest/:patientId/result/:medicalDatadocID').post(createLaboratoryReport)
router.route('/oplabresult/:id').get(getLaboratoryReportById).patch(updateLaboratoryReportById).delete(deleteLaboratoryReportById)

module.exports= router
