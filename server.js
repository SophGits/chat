var io = require('socket.io'),
    connect = require('connect');

var app = connect().use(connect.static('public')).listen(4000);
var room = io.listen(app);

room.sockets.on('connection', function(socket){
  socket.emit('entrance', {message: 'Welcome to the chat room!'});
  console.log("CONNECTED");
})
