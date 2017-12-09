// modules
var http = require('http'); // http server functionality
var fs = require('fs'); // filesystem functionality
var path = require('path'); // filesystem path-related functionality
var mime = require('mime'); // recognition of mime-types by extension

// cache
var cache = {};

// debug
var debug = require('debug')('http')
  , name = 'Multiroom-Chat';

// resource not found
function send404(response){
	response.writeHead(404, {'Content-Type' : 'text/plain'});
	response.write('Error 404: resource not found');
	response.end();
}

// send file
function sendFile(response, filePath, fileContents){
	response.writeHead(200,
		{'content-type' : mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

// serve file
function serveStatic(response, cache, absPath){
	if(cache[absPath]){
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.exists(absPath, function(exists){
			if (exists) {
				fs.readFile(absPath, function(err, data){
					if (err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} else {
				send404(response);
			}
		});
	}
}

// create server
var server = http.createServer(function(request, response){
	var filePath = false;
	if (request.url == '/') {
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + request.url;
	}
	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});
server.listen(3000, function(){
	console.log('Server listening on port 3000.');
});

// define chat server
var chatServer = require('./lib/chat_server');
chatServer.listen(server);