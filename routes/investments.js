const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Portfolio = require('../models/portfolio');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Add an investment to the user's portfolio, using a middleware to authenticate transactions
router.post('/add', authenticate, async (req, res) => {
    const { scheme_name, scheme_code, units_held, purchase_date, investment_amount } = req.body;

    try {
        if (!scheme_name || !scheme_code || !units_held) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newInvestment = new Portfolio({
            user_id: req.user.id,
            scheme_name,
            scheme_code,
            units_held: parseFloat(units_held),
            purchase_date: purchase_date || null,
            investment_amount: parseFloat(investment_amount) || null,
            created_at: new Date()
        });

        await newInvestment.save();

        res.status(201).json({ message: 'Investment added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch the user's portfolio
router.get('/', authenticate, async (req, res) => {
    try {
        const portfolio = await Portfolio.find({ user_id: req.user.id });

        const updatedPortfolio = await Promise.all(
            portfolio.map(async (investment) => {
                try {
                    const response = await axios.get('https://latest-mutual-fund-nav.p.rapidapi.com/latest', {
                        params: { Scheme_Code: investment.scheme_code },
                        headers: {
                            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                            'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com'
                        }
                    });

                    const navData = response.data[0];

                    return {
                        ...investment.toObject(),
                        latest_nav: navData.Net_Asset_Value,
                        current_value: (investment.units_held * navData.Net_Asset_Value).toFixed(2),
                        nav_date: navData.Date
                    };
                } catch (error) {
                    console.error(`Error fetching NAV for scheme ${investment.scheme_code}:`, error);
                    return {
                        ...investment.toObject(),
                        latest_nav: null,
                        current_value: null,
                        nav_date: null
                    };
                }
            })
        );

        res.status(200).json({ portfolio: updatedPortfolio });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;