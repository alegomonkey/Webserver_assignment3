// pdfValidate.js
// function that checks if a pdf exists in specifically the /pdfs directory
const fs = require('fs');
const path = require('path');

// find pdf folder
const pdfFolder = path.join(__dirname, 'pdfs');

function validatePDF(pdfName) {
    // create a file path with the supplied pdfName
    const filePath = path.join(pdfFolder, pdfName);
    // check if the path is valid, return Boolian T/F
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        console.error('Error validating PDF:', err);
        return false;
    }
}

module.exports = { validatePDF };

