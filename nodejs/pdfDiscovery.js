// pdfDiscovery.js
// finds and caches all available PDFs in the server
const fs = require('fs');
const path = require('path');

// find pdf folder & init cache for all existing PDFs
const pdfFolder = path.join(__dirname, 'pdfs');
let cachedPDFs = null;

// scan the folder and update cached list of PDFs
// cachedPDFs has ONLY file name, not extension
function scanPDFs() {
  try {
    const files = fs.readdirSync(pdfFolder);
    cachedPDFs = files.filter(file => file.endsWith('.pdf'));
  } catch (err) {
    console.error('Error scanning PDF folder:', err);
    cachedPDFs = [];
  }
}

// get list of PDFs (cached if available)
function getPDFList() {
  if (!cachedPDFs) {
    scanPDFs();
  }
  return cachedPDFs;
}

module.exports = { getPDFList, scanPDFs };
