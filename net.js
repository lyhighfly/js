'use strict';
var http = require('http');

var server = http.createServer(function(request, response){
    console.log("Arrive Request:"+request.method + ":"+request.url);
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('<h1>Hello world</h1>');
});
server.listen(8080);
console.log('server is running : http://127.0.0.1:8080/');