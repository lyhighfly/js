var http = require('http');

var server = http.createServer(function(req, res){
    var head = req.headers;
    console.log("header:"+head);
    // var body = 'Hello World';
    // res.setHeader("Content-Type", "text/plain");
    // res.setHeader("Content-Length", body.length);
    res.statusCode = 200;
    res.end();
    // res.end(body);
    
});
server.listen(8888, "127.0.0.1");