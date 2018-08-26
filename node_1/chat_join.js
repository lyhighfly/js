var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        console.error("broadcast: sendID" + senderId + "  msg:" + message);
        if (id != senderId) {
            this.clients[id].write(message);
        }
    }
    console.error("join client" + id);
    this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has left chat room");
    console.error(id + " left chat remove broadcast listener");
})

channel.on('shutdown', function (id) {
    channel.emit('broadcast', id, id + " shut down chat server");
    channel.removeAllListeners();
    console.error("server shut down");
})

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ":" + client.remotePort;
    channel.emit('join', id, client);
    client.on('data', function (data) {
        console.error("send data:" + data);
        data = data.toString();
        if (data == "shutdown\r\n") {
            channel.emit('shutdown', id);
        } else {
            channel.emit('broadcast', id, data);
        }
    });

    client.on('close', function () {
        channel.emit('leave', id);
    })
    console.error("config finish");
});

server.listen(8008);