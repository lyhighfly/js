var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var chatServer = require('./lib/chat_server');
var cache = {};
console.log("require ok");
function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: resource not found');
    response.end();
}
console.log("init ok1");
function sendFile(response, filepath, filecontent) {
    response.writeHead(200, { 'Content-Type': mime.lookup(path.basename(filepath)) });
    response.end(filecontent);
}
console.log("init ok2");
function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function (exists) {
            if (exists) {
                fs.readFile(absPath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                })
            } else {
                send404(response);
            }
        })
    }
}
console.log("init ok3");
var server = http.createServer(function(request, response){
    var filePath = false;
    if(request.url == '/'){
        filePath = 'public/index.html';
    }else{
        filePath = 'public'+request.url;
    }
    var absPath = './'+filePath;
    serveStatic(response, cache, absPath);
});
console.log("init ok4");
server.listen(3000, function(){
    console.log('server running at : localhost:3000');
})
chatServer.listen(server);
console.log("init ok5");