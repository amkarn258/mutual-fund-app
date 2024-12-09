const mongoose = require('mongoose');

const fundFamilySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const FundFamily = mongoose.model('FundFamily', fundFamilySchema);

module.exports = FundFamily;