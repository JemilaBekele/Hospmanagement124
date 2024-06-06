const express= require('express')
const router= express.Router()

const {paymentAwaitingConfirmation, confirmPayment
    ,
    Labstartphase,Labprogressphase ,Labendphase,updatelabstatus

    }= require('../controllers/paymentconfirmation')


router.route('/paymentconfirm').get(paymentAwaitingConfirmation)
router.route('/paymentconfirm/:patientId/approve/:medicalDatadocID').patch(confirmPayment)


router.route('/labstatus/start').get(Labstartphase)
router.route('/labstatus/progress').get(Labprogressphase)
router.route('/labstatus/end').get(Labendphase)
router.route('/labstatus/:patientId/update/:medicalDatadocID').patch(updatelabstatus)



module.exports= router
