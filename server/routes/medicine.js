const express= require('express')
const router= express.Router()

const { createmedicine, getAllmedicine, updatemedicine, deletemedicine, getmedicine}= require('../controllers/medicine')

router.route('/').post(createmedicine).get(getAllmedicine)
router.route('/getmedicine/:id').patch(updatemedicine).delete(deletemedicine).get(getmedicine)


module.exports= router
