const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes

    const user= Users.findById(payload.id).select('-password')
    req.user= user
    req.user = { userId: payload.userId, firstName: payload.firstName, lastName: payload.lastName, role: payload.role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth