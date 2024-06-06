const mongoose = require('mongoose')


const MedicalData = new mongoose.Schema({
  AreaDiscomfort : {
    type: String,
  },
  OnsetDiscomfort: {
    type: String,
  },
  Frequencypian: {
    type: String,
    enum: ['constant', 'off/on', 'at rest', 'with activity', 'other'],
  },
  Daypain: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'during sleep', 'other'],
  },
  Releatedtreatment: {
    type: String,
    
  },
  increasedecreasepain: {
    type: String,
  },
  symptoms: {
    type: String,
  },
  Clinicalchemistry: {
    type: String,
    enum: ['FBS/RBS','SGOT/AST','ALP','BILIRUBIN(T)','Total Protine','Albumin','BUN/Urea','Creatinine','Triglyceride','HDL','LDL','Uric acid','Amylase','Lipase','LDH'],
  },
  Urinalysis: {
    type: String,
    enum: ['Color','Appearance','PH','Sp Gravity','Protein', 'Glucose', 'Ketone', 'Bilirubin','Urobilinogen','Blood','Nitrite','Leukocyte','Microscopic', 'Epit Cells', 'RBC','WBC','Casts','Crystals'],
  },
  serology: {
    type: String,
    enum: ['Widal H', 'O', 'Weilfelix','HBsAg', 'HCV', 'ASO','RF', 'VDRL/RPR','H.Pylori Ag','H.pylori ab','HIV ab', 'RDT','Serum HCG'],
  },
  bacteriology: {
    type: String,
    enum: ['KOH','Gram Stain','Wet mount','Skin snip','Culture & Sensitivit'],
  },
  hormonalassay: {
    type: String,    
    enum: ['Beta HCG', 'Testosterone', 'Progesteron', 'Prolacin', 'LH',, 'FSH', 'Estadiol']
  },
  coagulation: {
    type: String,
    enum: [ 'PT','PTT','INR'],
  },
  stoolexamination: {
    type: String,
    enum: [ 'Color', 'Consistency', 'Occult Blood'],
  },
  electrolytepanel: {
    type: String,
    enum: ['Magnesium','Calcium', 'Chloride', 'Potassium', 'Sodium'],
  },
  hematology: {
    type: String,
    enum: ['CBC','ESR','Bllod Groud & Rh','Periph Morp','Comb test','Blood Film'],
  },
  paid: {
    type: Boolean,
    default: false // Payment is not paid by default
},
LabStatus: {
  type: String,
  default: 'start',
  enum: ['start', 'Progress', 'end']
},
  createdBy:[ {
    id:{type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Please provide doctor Id'],},
    name: {
        type: String,
        required: [true, 'Please provide sender name'],
      },
    namelast: {
          type: String,
          required: [true, 'Please provide sender name'],
        },  
  }],

}, {
  timestamps: true,
});

const MedicalInformationSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    enum: ['A', 'B', 'AB', 'O', 'Unknown'],
    required: [true, 'Please provide blood type'],
  },
  allergies: {
    type: String,
  },
  medicalConditions: {
    type: String,
  },
  assigneddoctorTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
},
  weight: {
    type: Number,
  },
  createdBy:[ {
    id:{type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Please provide nurse id'],},
    name: {
        type: String,
        required: [true, 'Please provide sender name'],
      },
    namelast: {
          type: String,
          required: [true, 'Please provide sender name'],
        },  
  }],

}, {
  timestamps: true,
});


const PatientSchema= new mongoose.Schema({

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
  address: {
    type: String,
    required: [true, 'Please provide address'],
    minlength: 5,
    maxlength: 100
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Please provide gender'],
  },
  age: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide date of birth'],
  },
  Status: {
    type: String,
    required: [true, 'Please provide a status'],
    enum: ['Active', 'Inactive']
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
  createdBy:[ {
    id:{type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Please provide user'],},
    name: {
        type: String,
        required: [true, 'Please provide sender name'],
      },
    namelast: {
          type: String,
          required: [true, 'Please provide sender name'],
        },
    
  }],
  MedicalInformation: [MedicalInformationSchema],
  MedicalData: [MedicalData],
  emergencyContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmergencyContact',
  },

  medicalInsurance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalInsurance',
  }, 
  

},
{
  timestamps: true,
}
)



module.exports= mongoose.model('Patient', PatientSchema )