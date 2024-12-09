const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetching unique fund families from the latest mutual fund data
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://latest-mutual-fund-nav.p.rapidapi.com/latest', {
        params: {
            Scheme_Type: 'Open'
        },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com'
        }
    });
    const fundFamilies = response.data.map(fund => fund.Mutual_Fund_Family);
    const uniqueFundFamilies = [...new Set(fundFamilies)];

    res.status(200).json(uniqueFundFamilies);
  } catch (err) {
    console.error('Error fetching fund families:', err.message);
    res.status(500).json({ message: 'Failed to fetch fund families', error: err.message });
  }
});

module.exports = router;