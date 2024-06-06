const Users = require('../models/Users')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, UnauthenticatedError}= require('../errors')
const asyncWrapper= require('../middleware/async')


const register = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    const accessToken = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        firstName: user.firstName,
      },     
      accessToken,
    });
  } catch (error) {
    // Check if the error is a duplicate key error
    if (error.name === 'MongoError' && error.code === 11000) {
      // Duplicate key error, likely due to duplicate email
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          message: 'Email address is already in use. Please use a different email.',
        },
      });
    }

    // For other types of errors, respond with a generic message
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      error
    );
  }
};



const  login = async (req, res)=>{
  const {email, password}= req.body

  if(!email || !password){
    throw new BadRequestError('Please provide email and password')
  }
  const user= await Users.findOne({email})
  if(!user){
    throw new UnauthenticatedError('Invalid Credentials')
  }

  //compare password exit
  const ispasswordCorrect = await user.comparePassword(password)
  if(!ispasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const accessToken= user.createJWT()
  res.status(StatusCodes.OK).json({user: {firstName: user.firstName}, accessToken})
}


const  getAllUser= asyncWrapper( async (req,res)=>{
    const user= await Users.find({})
    const roleCounts = {
      nurse: 0,
      doctor: 0,
      admin: 0,
      registrar: 0,
      Labratory: 0,
      radiology: 0,
    };

    user.forEach((userr) => {
      roleCounts[userr.role]++;
    });

    res.status(200).json({user, userCount: user.length, roleCounts });

})

const getUser= asyncWrapper(async(req, res)=>{
    const {id:userID}= req.params
    const user= await Users.findOne({_id: userID})
    if(!user){
      return res.status(404).json({msg:`no user eith id : ${userID}`})
    }
    res.status(200).json({user})

})


const deleteUser= asyncWrapper(async(req, res)=>{
    const {id:userID}= req.params
    const user= await Users.findOneAndDelete({_id: userID})
    if(!user){
      return res.status(404).json({msg:`no user eith id : ${userID}`})
    }
    res.status(200).json({user})

})

const updateUser=asyncWrapper( async(req, res)=>{
    const {id:userID}= req.params
    const user= await Users.findOneAndUpdate({_id: userID}, req.body, {
      new: true,
      runValidators: true
    })
    if(!user){
      return res.status(404).json({msg:`no user eith id : ${userID}`})
    }
    res.status(200).json({user})

})




module.exports={login, register, getAllUser, getUser, deleteUser,updateUser}