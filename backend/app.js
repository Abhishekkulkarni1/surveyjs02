const express = require('express');
const cors = require('cors');
const surveyRoutes = require('./routes/surveyRoutes');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(fileUpload());

app.use('/api/surveys', surveyRoutes);

module.exports = app;