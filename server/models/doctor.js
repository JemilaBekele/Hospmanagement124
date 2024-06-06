// doctorModel.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
  },
  specialization: {
    type: String,
    required: [true, 'Please provide specialization'],
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        // This regex checks for a valid phone number format, adjust as needed
        return /^\+251\d{9}$/g.test(v);
      },
      message: 'Please provide a valid phone number',
    },
    required: [true, 'Please provide a phone number'],
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
},
{
  timestamps: true,
}
)



module.exports= mongoose.model('DoctorSchema', DoctorSchema, )
