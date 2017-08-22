var http = require('http');

var url = require('url');

function start(route) {
    function onRequest(request, response) {
	console.log("request received");
        var pathname = url.parse(request.url)['pathname'];
        route(pathname);
	response.writeHead(200, {'Content-Type': 'text/plain'})
	response.write("Hello world from Chaitanya");
	response.end();        
    }

    http.createServer(onRequest).listen(8080);

    console.log("listenting on port 8080");
}

exports.start = start;


