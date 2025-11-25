const express = require('express');
const path = require('path');
const fs = require('fs');

// Import from your custom modules
const { getPDFList, scanPDFs } = require('./pdfDiscovery');
const { validatePDF } = require('./pdfValidate');

const router = express.Router();

// Load metadata once at startup
const metadataPath = path.join(__dirname, 'pdfs', 'pdfMetadata.json');
let pdfMetadata = {};

try {
  const data = fs.readFileSync(metadataPath, 'utf-8');
  pdfMetadata = JSON.parse(data);
} catch (err) {
  console.error('Error reading metadata file:', err);
}

// Main page route
router.get('/', (req, res) => {
  // Use discovery module to get list of PDFs
  const pdfs = getPDFList().map(file => ({
    id: file.replace('.pdf', ''),
    title: pdfMetadata[file]?.title || file,
    description: pdfMetadata[file]?.description || 'No description available'
  }));
  res.render('home', { pdfs });
});

// Serve PDFs if they exist
router.get('/:pdfName', (req, res) => {
  const pdfFile = req.params.pdfName + '.pdf';
  const filePath = path.join(__dirname, 'pdfs', pdfFile);

  if (validatePDF(pdfFile)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('PDF not found');
  }
});

// Handle 404 for other routes
router.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = { router };
