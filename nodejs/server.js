// server.js
// serve a site that allows users to view pdfs
const express = require("express");
const path = require('path');

// import custom module
const { router } = require('./routing.js');

const PORT = 3010;
const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// serve static css
app.use(express.static(path.join(__dirname, 'public')));

// apply routing.js to the app
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
});