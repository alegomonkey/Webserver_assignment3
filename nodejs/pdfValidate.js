// pdfValidate.js
// function that checks if a pdf exists in specifically the /pdfs directory
const fs = require('fs');
const path = require('path');

const pdfDirectory = path.join(__dirname, 'pdfs');

function validatePDF(pdfName) {
  const filePath = path.join(pdfDirectory, `${pdfName}.pdf`);
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    console.error('Error validating PDF:', err);
    return false;
  }
}

module.exports = { validatePDF };
