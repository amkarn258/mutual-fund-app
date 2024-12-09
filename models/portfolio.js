const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scheme_name: {
        type: String,
        required: true
    },
    scheme_code: {
        type: Number,
        required: true
    },
    units_held: {
        type: Number,
        required: true
    },
    purchase_date: {
        type: Date,
        default: null
    },
    investment_amount: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;