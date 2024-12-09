const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/openEndedSchemes', async (req, res) => {
  const { mutual_fund_family } = req.query;

  if (!mutual_fund_family) {
    return res.status(400).json({ message: 'Mutual fund family is required' });
  }

  try {
    const response = await axios.get('https://latest-mutual-fund-nav.p.rapidapi.com/latest', {
        params: {
            Scheme_Type: 'Open',
            Mutual_Fund_Family: mutual_fund_family
        },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com'
        }
    });

    if (response.data.length === 0) {
      return res.status(404).json({ message: 'No open-ended schemes found for the specified mutual fund family' });
    }

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Error fetching open-ended schemes:', err.message);
    res.status(500).json({ message: 'Failed to fetch open-ended schemes', error: err.message });
  }
});

module.exports = router;