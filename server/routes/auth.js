const express= require('express')
const router= express.Router()

const {login, register, getAllUser, getUser, deleteUser, updateUser}= require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getuser').get(getAllUser)
router.route('/getuser/:id').get(getUser).delete(deleteUser).patch(updateUser)


module.exports= router
