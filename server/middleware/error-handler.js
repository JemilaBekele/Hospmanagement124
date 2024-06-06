const {CustomAPIError}= require('../errors')
const {StatusCodes}= require('http-status-codes')
const errorHandlerMiddleware= (err, req, res, next)=>{
  console.log(err)
  if(err instanceof CustomAPIError){
    return res.status(err.StatusCodes).json({msg: err.message})
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
//check the vedio on 7:55
}

module.exports= errorHandlerMiddleware