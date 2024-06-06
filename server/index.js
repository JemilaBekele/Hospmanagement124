const express= require('express')
require('express-async-errors');
const dotenv= require('dotenv').config()
const cors= require('cors')

const mongoose= require('mongoose')
const app= express();
const connectDB = require('./db/connect');

app.use(express.json())
app.use(cors());

//error handler
const authenticateUser = require('./middleware/authentication');
//routers
const authRouter= require('./routes/auth')
const doctorRouter= require('./routes/medicine')
const patientRouter= require('./routes/patient')
const medicalInformation= require('./routes/medicalInformation')
const medicalData= require('./routes/medicalData')
const paymentconfirm= require('./routes/paymentconfirmation')
const Lab_result= require('./routes/Labrarory_result')


//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/medicine', doctorRouter)
app.use('/api/v1/nurse', authenticateUser,medicalInformation)
app.use('/api/v1/doc', authenticateUser,medicalData)
app.use('/api/v1/patient',authenticateUser, patientRouter)
app.use('/api/v1/pay',authenticateUser, paymentconfirm)
app.use('/api/v1/lab', authenticateUser,Lab_result)




// database connection
const port= process.env.PORT || 8000;

const start = async()=>{
  try{
    await connectDB(process.env.MONGO_URL)
    app.listen(port, ()=> console.log(`server is running on port ${port}`))

  }catch(error){
    console.log(error)
  }
}

start()
