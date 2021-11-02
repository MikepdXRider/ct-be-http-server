// Import app from ./lib/app.
const app = require('./lib/app.js');
// Import http from 'http'
const http = require('http');

// create a port variable which hits a default port or soemthing in our process.env file.
const PORT = process.env.PORT || 7980;

// create a server variable. Call http.createServer() method, passing in app.js function. 
const server = http.createServer(app);

// listen for requests on server passing in port to listen method.
server.listen(PORT);

