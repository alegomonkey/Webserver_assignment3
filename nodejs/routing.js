// routing.js
// handle routes to display homepage and pdfs
// parses pdf metadata and hands off to hbs
const express = require('express');
const path = require('path');
const fs = require('fs');

// import custom modules
const { getPDFList } = require('./pdfDiscovery');
const { validatePDF } = require('./pdfValidate');

const router = express.Router();

// load metadata once at startup
const metadataPath = path.join(__dirname, 'pdfs', 'pdfMetadata.json');
let pdfMetadata = {};

// check if metadata exists and parse it if it does. 
try {
    const data = fs.readFileSync(metadataPath, 'utf-8');
    pdfMetadata = JSON.parse(data);
} catch (err) {
    console.error('Error reading metadata file:', err);
}

// main page route
router.get('/', (req, res) => {
    // use discovery module to get list of PDFs (scans if first time)
    // map contents to parse into hbs
    const pdfs = getPDFList().map(file => ({
        id: file.replace('.pdf', ''),
        title: pdfMetadata[file]?.title || file,
        description: pdfMetadata[file]?.description || 'No description available'
    }));
    res.render('home', { pdfs });
});

// serve PDFs if they exist
router.get('/:pdfName', (req, res) => {
    // take the route (file name) and append .pdf and get route to that file
    const pdfFile = req.params.pdfName + '.pdf';
    const filePath = path.join(__dirname, 'pdfs', pdfFile);

    // send PDF if path is real via validation module
    if (validatePDF(pdfFile)) {
        res.sendFile(filePath);
    } else {
        // always executes for non-existant routes
        res.status(404).send('PDF not found');
    }
});

// redundant 404 for other routes
router.use((req, res) => {
    res.status(404).send('Page not found');
});

module.exports = { router };
