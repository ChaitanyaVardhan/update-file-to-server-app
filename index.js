var server = require('./server');

var router = require('./router');

var requestHandler = require('./requestHandler');

//build the handle dictionary where key is the url
//and value is the handler function in the requestHandler file

var handle = {}
handle['/'] = requestHandler.start;
handle['/start'] = requestHandler.start;
handle['/upload'] = requestHandler.upload;
handle['/misc'] = requestHandler.misc;
handle['/show'] = requestHandler.show

server.start(router.route, handle)

