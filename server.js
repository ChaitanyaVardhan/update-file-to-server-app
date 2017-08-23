var http = require('http');

var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url)['pathname'];
	console.log("request for " + pathname + " received");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
        })

        request.addListener("end", function() {
            route(pathname, handle, response, postData);
        })
    }

    http.createServer(onRequest).listen(8080);

    console.log("listenting on port 8080");
}

exports.start = start;


