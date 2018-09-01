var Client = require('./node_modules/mysql').Client;
var client = new Client();

client.user = 'root';
client.password = '123456';
client.query('USE timetrack');