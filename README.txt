Johnny Sylvain
COS498 - Server Side Web Development Assignment 3

Webserver for serving PDF tree identification guides for Australia, New England, and United Kingdoms. 
To run:
1. Clone this repo into a directory
2. cd into the directory
3. run docker compose build
4. run docker compose up

5.1 For first time run: setup nginx proxy manager on - yourIP:5001
5.2 Sign in/up with secure credentials
5.3 Go to certificates and create a new one (VIA HTTP) by filling the popup
5.4 Under hosts -> proxy hosts -> Add Proxy Host -> Fill information (enable block common exploits and web sockets) & save
5.5 reopen proxy host and under SSL tab -> select the created certificate

Metadata file format: 
"filename.pdf": {
	title: "text", 
	description: "text"
}

Routing Structure: 
"/" -> home.hbs : main and only webpage that displays a breif description of tree identification and one section for each pdf to view. 
"/:pdfName" handles all additional routes by checking if the route matches a PDF in the server and serving it if it exists.
If a PDF does not exist, ie. a route is entered that does not resolve, an error page with PDF not found will be displayed. 
