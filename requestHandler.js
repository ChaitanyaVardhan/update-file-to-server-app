var exec = require("child_process").exec;

var querystring = require('querystring');

var fs = require('fs');

var formidable = require('formidable');

function start(response, postData) {
    console.log("Request handler 'start' was called");
    
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html"; ' +
        'charset="utf-8">' +
        '</head>' +
        '<body>' + 
//        '<h2>Please enter text</h2>' + 
//        '<form action="/upload" method="post">' +
//        '<textarea name="text" rows="20" cols="60"></textarea>' +
//        '<p><input type="submit" value="Submit"></p>' +
        '<h2>Please select file to upload</h2>' +
        '<form action="/upload" method="post" ' +
        ' enctype="multipart/form-data">' +
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="Upload file">' +
	'</form>' +
        '</body>' +
        '</html>';

	response.writeHead(200, {'Content-Type': 'text/html'})
	response.write(body);
	response.end();

}

function upload(response, postData, request) {
    console.log("Request handler 'upload' was called");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");

        fs.rename(files.upload.path, "./tmp/test.jpg", function(error) {
            if (error) {
                fs.unlink("./tmp/test.jpg");
                fs.rename("files.upload.path", "./tmp/test.jpg");
            }
        });
        response.writeHead(200, {'Content-Type': 'text/html'})        
        response.write("received image: <br>");
        response.write("<img src='/show'>");
        response.end();
    })
//    response.write("You have sent: " + querystring.parse(postData).text);
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

function show(response) {
    console.log("Request handler 'show' was called");
    response.writeHead(200, {'Content-Type': 'image/jpeg'});
    fs.createReadStream("./tmp/test.jpg").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.misc = misc;
exports.show = show;


