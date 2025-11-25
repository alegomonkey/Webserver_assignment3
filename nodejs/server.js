const express = require("express");
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
const Throttle = require('throttle');

const PORT = 3010;
const app = express();

// in bytes (100kb)
const BANDWIDTH = 100000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render('home');
});

app.get('/smallfile', (req, res) => {
    const filePath = path.join(__dirname, 'TCP File Transfer.pdf');
    // ok for small files
    // calculate file size
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    // tell client what kind of data it is, file size, and file name
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', fileSize);
    res.setHeader('Content-Disposition', 'attachment; filename="TCP File Transfer.pdf"');
    res.sendFile(filePath);
});

app.get('/bigfile', (req, res) => {
    const filePath = path.join(__dirname, 'Docker Desktop Installer.exe');
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

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
});