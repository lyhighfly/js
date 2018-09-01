module.paths.push('/Users/liuyu/.npm-packages/lib/node_modules');

var http = require('http');
var app = require('./app');

http.createServer(app).listen(3000, function(){
    console.log('Express', "receive:");
});
