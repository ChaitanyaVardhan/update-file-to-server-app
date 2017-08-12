var http = require('http');

function start() {
    function onRequest(request, response) {
	console.log("request received");
	response.writeHead(200, {'Content-Type': 'text/plain'})
	response.write("Hello world from Chaitanya");
	response.end();        
    }

    http.createServer(onRequest).listen(8080);

    console.log("listenting on port 8080");
}

exports.start = start;


