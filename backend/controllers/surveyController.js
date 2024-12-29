const { saveSurvey } = require('../models/surveyModel');

const submitSurvey = (req, res) => {
  const surveyData = req.body;
  console.log(surveyData);
  
  saveSurvey(surveyData, (err, results) => {
    if (err) {
      console.log(err);      
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json({ message: 'Survey submitted successfully', results });
  });
};

module.exports = { submitSurvey };

// const path = require('path');
// const { saveSurvey } = require('../models/surveyModel');

// // Update the controller to handle file uploads properly
// const submitSurvey = (req, res) => {
//   const surveyData = req.body;

//   // Assuming fileUpload is available in req.files
//   const file = req.files.fileUpload; // this assumes you're using 'express-fileupload'

//   if (file) {
//     const uploadPath = path.join(__dirname, '..', 'uploads', file.name);  // Save the image in 'uploads' folder

//     // Move the file to the server's file system
//     file.mv(uploadPath, (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'File upload failed', error: err });
//       }

//       // Save survey data along with file path to MySQL
//       surveyData.filePath = uploadPath;

//       saveSurvey(surveyData, (err, results) => {
//         if (err) {
//           return res.status(500).json({ message: 'Database error', error: err });
//         }
//         res.status(200).json({ message: 'Survey submitted successfully', results });
//       });
//     });
//   } else {
//     res.status(400).json({ message: 'No file uploaded' });
//   }
// };

// module.exports = { submitSurvey };
