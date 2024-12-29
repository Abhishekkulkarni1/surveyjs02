const db = require('../config/db');

const saveSurvey = (data) => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(data.modeOfTransport)) {
      data.modeOfTransport = data.modeOfTransport.join(', ');
    }
    if (data.rateStatements && typeof data.rateStatements === 'object') {
      data.rateStatements = JSON.stringify(data.rateStatements);
    }

    const sql = 'INSERT INTO responses SET ?';
    // const sql = `INSERT INTO responses (firstName, lastName, email, filePath) 
    // VALUES (?, ?, ?, ?)`;
    db.query(sql, data, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  }); 
};

module.exports = { saveSurvey };
