var exec = require("child_process").exec;

var querystring = require('querystring');

function start(response, postData) {
    console.log("Request handler 'start' was called");
    
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html"; ' +
        'charset="utf-8">' +
        '</head>' +
        '<body>' + 
        '<h2>Please enter text</h2>' + 
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<p><input type="submit" value="Submit"></p>' +
	'</form>' +
        '</body>' +
        '</html>';

	response.writeHead(200, {'Content-Type': 'text/html'})
	response.write(body);
	response.end();

}

function upload(response, postData) {
    console.log("Request handler 'upload' was called");

    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.write("You have sent: " + querystring.parse(postData).text);
    response.end();

}

/* this misc handler stores all code to experiment with the
exec model of node js 
*/

function misc(response) {
    console.log("Request handler 'misc' was called");

    exec("find /",
        { timeout: 10000, maxBuffer: 20000*1024},
        function(error, stdout, stderr) {
	    response.writeHead(200, {'Content-Type': 'text/plain'})
	    response.write(stdout);
	    response.end();
    });
/*
    function sleep(milliseconds) {
        var startTime = new Date().getTime();
        while ( new Date().getTime() < startTime + milliseconds);
    }

    sleep(10000)
*/

/*
    exec("ls -alh", function(error, stdout, stderr) {
	response.writeHead(200, {'Content-Type': 'text/plain'})
	response.write(stdout);
	response.end();
    });
*/
}

exports.start = start;
exports.upload = upload;
exports.misc = misc;


