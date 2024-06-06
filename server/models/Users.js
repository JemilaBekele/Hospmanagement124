const mongoose = require('mongoose')   
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema= new mongoose.Schema({
  firstName:{
    type: String,
    required: [true, 'Plese provide first name'],
    minlength: 3,
    maxkength:50
  },
  lastName:{
    type: String,
    required: [true, 'Plese provide last name'],
    minlength: 3,
    maxkength:50
  },
  email:{
    type: String,
    required: [true, 'Plese provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password:{
    type: String,
    required: [true, 'Plese provide password'],
    minlength: 3,
    maxkength:12
  },
  address: {
    type: String,
    required: [true, 'Please provide address'],
    minlength: 5,
    maxlength: 100
  },
  role: {
    type: String,
    enum: ['admin', 'nurse', 'doctor', 'admin', 'registrar', "radiology", "Labratory"],
    required: [true, 'Please provide a valid role']
  },
  Salary: {
    type: Number,
    min: 0, // Assuming the price should be non-negative
  },
  phoneNumber: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        // This regex checks for a valid phone number format, adjust as needed
        return /^\+251\d{9}$/g.test(v);
      },
      message: 'Please provide a valid 10-digit phone number'
    },
    required: [true, 'Please provide a phone number']
  },

},
{
  timestamps: true,
}
)

UserSchema.pre('save', async function (next){
  const salt= await bcrypt.genSalt(10)
  this.password= await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJWT= function(){
  return jwt.sign({userId: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email, address: this.address, role: this.role}, process.env.JWT_SECRET ,{ expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword= async function(canditatePassword){
  const isMatch= await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports= mongoose.model('Users', UserSchema, )