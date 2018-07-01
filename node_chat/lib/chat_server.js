var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickName = {};
var nameUsed = [];
var currentRoom = {};

exports.listen = function (server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickName, nameUsed);
        joinRoom(socket, "Lobby");

        handleMessageBroadcasting(socket, nickName);
        handleNameChangeAttempts(socket, nickName, nameUsed);
        handleRoomJoining(socket);

        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.messager.rooms);
        });

        handleClientDisconnection(socket, nickName, nameUsed);
    });
};

function assignGuestName(socket, guestNumber, nickName, nameUsed) {
    var name = 'Guest' + guestNumber;
    nickName[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    nameUsed.push(name);
    return guestNumber + 1;
}

function joinRoom(socket, roomName) {
    socket.join(roomName);
    currentRoom[socket.id] = roomName;
    socket.emit('joinResult', { room: roomName });
    socket.broadcast.to(roomName).emit('message', {
        text: nickName[socket.id] + ' has joined ' + roomName
    });

    var usersInRoom = io.sockets.clients(roomName);
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = "Users currently in " + roomName + ":";
        for (var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0) {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickName[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', { text: usersInRoomSummary });
    }
}

function handleMessageBroadcasting(socket, nickName) {
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickName[socket.id] + ' : ' + message.text
        });
    });
}

function handleNameChangeAttempts(socket, nickName, nameUsed) {
    socket.on('nameAttempt', function (name) {
        if (name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
                success: false,
                message: 'Name cannot begin with Guest'
            })
        } else {
            if (nameUsed.indexOf(name) == -1) {
                var preName = nickName[socket.id];
                var preNameIndex = nameUsed.indexOf(preName);
                nameUsed.push(name);
                nickName[socket.id] = name;
                delete nameUsed[preNameIndex];
                socket.emit('nameResult', {
                    success: true,
                    name: name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: preName + ' is now known as ' + name
                })
            } else {
                socket.emit('nameResult', {
                    success: false,
                    message: 'That name is already in use'
                });
            }
        }
    });
}

function handleRoomJoining(socket) {
    socket.on('join', function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

function handleClientDisconnection(socket, nickName, nameUsed) {
    socket.on('disconnect', function () {
        var nameIndex = nameUsed.indexOf(nickName[socket.id]);
        delete nameUsed[nameIndex];
        delete nickName[socket.id];
    });
}