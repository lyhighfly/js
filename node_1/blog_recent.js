var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    if(req.url == '/'){
        getTitle(res);
    }
}).listen(8000, "127.0.0.1");

function getTitle(res){
    fs.readFile('./title.json', function(err, data){
        if(err){
            console.error(err);
            res.end("Server Error");
        }else{
            getTemp(res, data);
        }
    })
}

function getTemp(res, data){
    var title = JSON.parse(data.toString());
    fs.readFile('./template.html', function(err, data){
        if(err){
            console.error(err);
            res.end("Server Error");
        }else{
            var temp = data.toString();
            var html = temp.replace('%', title.join('</li><li>'));
            response(res, html);
        }
    })
}

function response(res, html){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(html);
}