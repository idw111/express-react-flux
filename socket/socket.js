var redis = require('socket.io-redis');
var channels = require('node-redis').createClient();
var messages = require('node-redis').createClient();
var SocketEvent = require('./SocketEvent');

module.exports = {

	server: function(io) {
		io.adapter(redis({host: 'localhost', port: 6379}));

		channels.on('message', function(id, message) {
			message = JSON.parse(message);
			io.sockets.in(id).emit(message.event, message.data);
		});

		io.on('connection', function (socket) {
			socket.on(SocketEvent.DISCONNECT, function() {
				console.log('Socket disconnected: ' + socket.id);
			});

			socket.on(SocketEvent.CHANNEL, function (channelId) {
				socket.join(channelId);
				channels.subscribe(channelId);
			});

			// bind socket to event handlers
			require('./comment').bind(socket);
		});
	},

	notify: function(data, done) {
		var instance = new Notification(data);
		instance.save(function(err) {
			if (err) return done(err);
			messages.publish(data.receiver, JSON.stringify({event: SocketEvent.NOTIFICATION, data: instance}));
			return done(null);
		});
	}

};
