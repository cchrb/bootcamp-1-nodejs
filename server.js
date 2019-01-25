var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
  Your request handler should send listingData in the JSON format if a GET request
  is sent to the '/listings' path. Otherwise, it should send a 404 error.

  HINT: explore the request object and its properties
  http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
 */

  if(request.method === "GET" && parsedUrl.path === "\listings") {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(listingData);
  } else { //Throw 404 error
    response.writeHead(404, { 'Content-Type': 'text/plain' });
  }
  response.end();

};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
   */

   if (err) throw err;
   listingData = JSON.parse(data); // Save listingData

   // Start Server
   server = http.createServer(requestHandler);
   // Listening for server, same confirmation as simpleServer
   server.listen(port, function() {
     console.log('Server listening on: http://127.0.0.1:' + port);
   });
});
