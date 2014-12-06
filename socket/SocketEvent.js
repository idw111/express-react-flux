module.exports = {

	DISCONNECT: 'disconnect',

	CHANNEL: 'channel',

	TALK: 'talk',

	NOTIFICATION: 'notification',

	toArray: function() {
		var array = [];
		for (var key in module.exports) {
			if (typeof module.exports[key] === 'string') array.push(module.exports[key]);
		}
		return array;
	}

};