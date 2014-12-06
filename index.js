var app = require('./app');
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./socket/socket').server(io);

http.listen(3001);
