var io = require('socket.io'),
    connect = require('connect');

var app = connect().use(connect.static('public')).listen(process.env.PORT || 3000);
var room = io.listen(app);

room.sockets.on('connection', function(socket){
  // new connection
  socket.emit('entrance', {message: 'Welcome to the chat room!'});
  room.sockets.emit('entrance', {message: 'Someone has logged on/ refreshed'});

  // return key is hit
  socket.on('speak', function(data){
    room.sockets.emit('speak', {message: '- ' + data.message});
  });

  socket.on('disconnect', function(){
    room.sockets.emit('disconnect', {message: 'Connection terminated'});
  });

});

