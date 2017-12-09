var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client){
	var welcome = 'Welcome!\n Guests online: ' + this.listeners('broadcast').length;
	client.write(welcome + '\n');
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message){
		if(id != senderId){
			this.clients[id].write(message);
		}
	}
	this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id){
	channel.removeListenner('broadcast', id, id + 'has left the chat.\n');
});

channel.on('shutdown', function(){
	channel.emit('broadcast', '', 'Chat has shut down.\n');
	channel.removeAllListeners('broadcast');
});

var server = net.createServer(function(client){
	var id = client.remoteAddress + ':' + client.remotePort;
	channel.emit('join', id, client);
	console.log('joined!');
	client.on('data', function(data){
		data = data.toString();
		if(data == 'shutdown\r\n'){
			channel.emit('shutdown');
		}
		channel.emit('broadcast', id, data);
		// console.log(data);
	});
	client.on('close', function(){
		channel.emit('leave', id);
	});
});
server.listen(8888);