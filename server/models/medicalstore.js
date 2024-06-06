// medicineModel.js
const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the medicine name'],
  },
  purchaseDate: {
    type: Date,
    required: [true, 'Please provide the purchase date'],
  },
  
  price: {
    type: Number,
    required: [true, 'Please provide the price'],
    min: 0, // Assuming the price should be non-negative
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide the quantity'],
    min: 0, // Assuming the quantity should be non-negative
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Medicine', MedicineSchema);
