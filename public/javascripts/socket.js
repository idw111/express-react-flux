define([
	'socketio'
], function(io) {
	var socket = io.connect('/', {forceNew: true});
	var init = function(channel) {
		socket.emit('channel', channel);
	};

	var channel = 1;
	init(channel);

	return socket;
});
