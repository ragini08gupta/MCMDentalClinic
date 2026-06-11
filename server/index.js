const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/appointments', require('./routes/appointments'));

app.listen(5000, () => console.log('Server running on port 5000'));