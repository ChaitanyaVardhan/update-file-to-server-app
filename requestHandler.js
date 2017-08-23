var exec = require("child_process").exec

function start(response) {
    console.log("Request handler 'start' was called");
    var content = "empty";



    exec("ls -alh", function(error, stdout, stderr) {
	response.writeHead(200, {'Content-Type': 'text/plain'})
	response.write(stdout);
	response.end();
    });

}

function upload(response) {
    console.log("Request handler 'upload' was called");

    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.write("Hello from upload");
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
}

exports.start = start;
exports.upload = upload;
exports.misc = misc;


