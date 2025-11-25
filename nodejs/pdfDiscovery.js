// pdfDiscovery.js
const fs = require('fs');
const path = require('path');

const pdfFolder = path.join(__dirname, 'pdfs');
let cachedPDFs = null;

function scanPDFs() {
  try {
    const files = fs.readdirSync(pdfFolder);
    cachedPDFs = files.filter(file => file.endsWith('.pdf'));
  } catch (err) {
    console.error('Error scanning PDF folder:', err);
    cachedPDFs = [];
  }
}

function getPDFList() {
  if (!cachedPDFs) {
    scanPDFs();
  }
  return cachedPDFs;
}

module.exports = { getPDFList };
