var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;
var server = http.createServer(function(req, res){
    var url = parse(req.url);
    var path = join(root, url.pathname);
    console.log(url + "reqest path:"+path);
    // var stream = fs.createReadStream(path);
    // stream.on('data', function(chunk){
    //     res.write(chunk);
    // });
    // stream.on('end', function(){
    //     res.end();
    // });
    fs.stat(path, function(err, stat){
        if(err){
            if('ENOENT' == err.code){
                res.statusCode = 404;
                res.end("NOT Found");
            }else {
                res.statusCode = 500;
                res.end("Internal Error");
            }
        }else{
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Length', stat.size);
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function(err){
                res.statusCode = 500;
                res.end("Internal Error");
            });
        }
    });
    // var stream = fs.createReadStream(path);
    // stream.pipe(res);
    // stream.on('error', function(err){
    //     res.statusCode = 500;
    //     res.end("Inlegal path");
    // });
});
server.listen(8888);