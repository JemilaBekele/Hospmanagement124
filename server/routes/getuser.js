const express= require('express')
const router= express.Router()

const {getAllUser,
getUser,
createUser,
updateUser,
deleteUser }= require('../controllers/users')

router.route('/').post(createUser).get(getAllUser)
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)


module.exports= router
