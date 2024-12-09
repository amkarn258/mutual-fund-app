const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const FundFamilyRouter = require('./routes/fundFamily');
const SchemeRouter = require('./routes/scheme');
const PortfolioRouter = require('./routes/investments');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/fundFamilies', FundFamilyRouter);
app.use('/api/schemes', SchemeRouter);
app.use('/api/portfolio', PortfolioRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});