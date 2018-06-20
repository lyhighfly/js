var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'image/png'});
    fs.createReadStream('../funny.jpg').pipe(res);
}).listen(4000);
console.log("Image running at 'http://localhost:4000'");