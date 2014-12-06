var redis = require('socket.io-redis');
var messages = require('node-redis').createClient();
var Comment = require('../model/Comment');

var eventHandlers = {
	comments: function(data) {
		data = JSON.parse(data);
		Comment.find({}, function(err, comments) {
			if (err) throw err;
			messages.publish(data.channel, JSON.stringify({event: 'comments', data: comments}));
		});
	},

	comment: function(message) {
		message = JSON.parse(message);
		console.log('comment', message);
		var comment = new Comment(message.data);
		comment.save(function(err) {
			if (err) throw err;
			messages.publish(message.channel, JSON.stringify({event: 'comment', data: comment}))
		});
	}
};

module.exports = {
	bind: function(socket) {
		for (var event in eventHandlers) {
			socket.on(event, eventHandlers[event]);
		}
	}
};
