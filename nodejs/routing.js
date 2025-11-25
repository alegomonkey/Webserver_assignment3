// routing.js
const express = require('express');
const path = require('path');
const pdfValidator = require('./pdfValidator');
const pdfDiscovery = require('./pdfDiscovery');

const router = express.Router();

// Main page route
router.get('/', (req, res) => {
  res.render('index'); // assumes Handlebars view engine
});

// Dynamic PDF routes
router.get('/:pdfName', (req, res) => {
  const pdfName = req.params.pdfName;

  if (pdfValidator.validatePDF(pdfName)) {
    const filePath = path.join(__dirname, 'pdfs', `${pdfName}.pdf`);
    res.sendFile(filePath);
  } else {
    res.status(404).send('PDF not found');
  }
});

// Endpoint to list available PDFs
router.get('/list/pdfs', (req, res) => {
  const pdfList = pdfDiscovery.getPDFList();
  res.json(pdfList);
});

// Handle 404 errors
router.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = { router };
