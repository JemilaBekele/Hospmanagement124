const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url, {}); // Fix typo here (change 'mongose' to 'mongoose')
}

module.exports = connectDB;
