// server.js
// Bring all modules together to serve a site
const express = require("express");
const path = require('path');

// import custom modules
const { router } = require('routing.js');
const { getPDFList } = require('pdfDiscovery.js');
const { validatePDF } = require('pdfValidate.js');


const PORT = 3010;
const app = express();

// in bytes (100kb)
const BANDWIDTH = 100000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static css
app.use(express.static(path.join(__dirname, 'public')));

// Apply routing.js to the app
app.use('/', routing);


/*
app.get("/", (req, res) => {
    res.render('home');
});

app.get('/NewEngland', (req, res) => {
    const filePath = path.join(__dirname, 'keynewenglandtr00coll.pdf');
    // calculate file size
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    // tell client what kind of data it is, file size, and file name
    res.setHeader('Content-Type', 'application/x-msdownload');
    res.setHeader('Content-Length', fileSize);
    // makes it auto download
    res.setHeader('Content-Disposition', 'attachment; filename="Docker Desktop Installer.exe"');

    // Create a read stream for the file
    const fileStream = fs.createReadStream(filePath);
    // Create a throttle stream to limit bandwidth
    const throttle = new Throttle(BANDWIDTH);

    // res.sendFile(filePath);
    // Pipe: file -> throttle -> response
    fileStream.pipe(throttle).pipe(res);
});

app.get('/UK', (req, res) => {
    const filePath = path.join(__dirname, 'tree-id-guide-UK.pdf');
    // calculate file size
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    // tell client what kind of data it is, file size, and file name
    res.setHeader('Content-Type', 'application/x-msdownload');
    res.setHeader('Content-Length', fileSize);
    // makes it auto download
    res.setHeader('Content-Disposition', 'attachment; filename="Docker Desktop Installer.exe"');

    // Create a read stream for the file
    const fileStream = fs.createReadStream(filePath);
    // Create a throttle stream to limit bandwidth
    const throttle = new Throttle(BANDWIDTH);

    // res.sendFile(filePath);
    // Pipe: file -> throttle -> response
    fileStream.pipe(throttle).pipe(res);
});

app.get('/Australia', (req, res) => {
    const filePath = path.join(__dirname, 'SW-forests.pdf');
    // calculate file size
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    // tell client what kind of data it is, file size, and file name
    res.setHeader('Content-Type', 'application/x-msdownload');
    res.setHeader('Content-Length', fileSize);
    // makes it auto download
    res.setHeader('Content-Disposition', 'attachment; filename="Docker Desktop Installer.exe"');

    // Create a read stream for the file
    const fileStream = fs.createReadStream(filePath);
    // Create a throttle stream to limit bandwidth
    const throttle = new Throttle(BANDWIDTH);

    // res.sendFile(filePath);
    // Pipe: file -> throttle -> response
    fileStream.pipe(throttle).pipe(res);
});

*/

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
});