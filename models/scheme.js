const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  fundFamily: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FundFamily',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  schemeType: {
    type: String,
    required: true,
  },
  riskCategory: {
    type: String,
    required: true,
  },
});

const Scheme = mongoose.model('Scheme', schemeSchema);

module.exports = Scheme;