const express = require('express');
const { submitSurvey } = require('../controllers/surveyController');

const router = express.Router();

router.post('/submit', submitSurvey);

module.exports = router;
