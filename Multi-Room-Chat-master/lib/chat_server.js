//
var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

//
exports.listen = function(server){
	io = socketio.listen(server);
	// io.set('log level', 1);
	
	io.sockets.on('connection', function(socket){
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		joinRoom(socket, 'Lobby');
		
		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttemps(socket, nickNames, namesUsed);
		handleRoomJoining(socket);
		
		socket.on('rooms', function(){
			var tmpRooms = getRooms(io);
			socket.emit('rooms', tmpRooms);
		});
		
		handleClientDisconnection(socket, nickNames, namesUsed);
	});
}

// assigning a guest name
function assignGuestName(socket, guestNumber, nickNames, namesUsed){
	var name = 'Guest' + guestNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult', {
		success: true,
		name: name
	});
	namesUsed.push(name);
	return guestNumber + 1;
}

// joining a room
function joinRoom(socket, room){
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.emit('joinResult', {room: room});
	socket.broadcast.to(room).emit('message', {
		text: nickNames[socket.id] + ' has joined ' + room + '.'
	});
	
	var usersInRoom = getUsersByRoom('/', room);
	if (usersInRoom != undefined && usersInRoom.length > 1) {
		var usersInRoomSummary = 'Users currently in ' + room + ': ';
		for (var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id;
			if(userSocketId != socket.id) {
				if (index > 0) {
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '.';
		socket.emit('message', {text: usersInRoomSummary});
	}
}

// name-request attempts
function handleNameChangeAttemps(socket, nickNames, namesUsed) {
	socket.on('nameAttempt', function(name) {
		if (name.indexOf('Guest') == 0) {
			socket.emit('nameResult', {
				success: false,
				message:'Names cannot begin with "Guest".'
			});
		} else {
			if (namesUsed.indexOf(name) == -1) {
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];
				socket.emit('nameResult', {
					success: true,
					name: name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					text: previousName + ' is now known as ' + name + '.'
				});
			} else {
				socket.emit('nameResult', {
					success: false,
					message: 'That name is already in use.'
				});
			}
		}
	});
}

// sending chat messages
function handleMessageBroadcasting(socket) {
	socket.on('message', function(message) {
		socket.broadcast.to(message.room).emit('message', {
			text: nickNames[socket.id] + ': ' + message.text
		});
	});
}

// creating rooms
function handleRoomJoining(socket) {
	socket.on('join', function(room) {
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}

// handling user disconnections
function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	})
}

// get all rooms
function getRooms(io){
	var allRooms = io.sockets.adapter.rooms;
	var allClients = io.engine.clients;
	var result = [];
	for(var room in allRooms){
		if(!allClients.hasOwnProperty(room)){
			result.push(room);
		}
	}
	return result;
}

// get clients in room
function getUsersByRoom(nsp, room) {
  var users = []
  for (var id in io.of(nsp).adapter.rooms[room]) {
    users.push(io.of(nsp).adapter.nsp.connected[id]);
  };
  return users;
};