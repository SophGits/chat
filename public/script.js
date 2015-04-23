$(document).ready(function () {

  var log_chat_message = function(message, type) {
    var li = $('<li />').text(message);

    if (type === 'enter') {
      li.css({'color': 'crimson'});
    } else if (type === 'speak') {
      li.css({'color': 'blue'});
    } else if (type === 'disconnect') {
      li.css({'font-weight': 'bold', 'color': 'darkorange'});
    }

    $('#chat_log').append(li);
  };

  function getHost(){
    var host = window.location.host;
    if(host.indexOf('localhost') >= 0){
     return 'http://localhost:3000';
    } else {
      return host
    }
  }
  var socket = io.connect(getHost());

  socket.on('entrance', function(data) {
    log_chat_message(data.message, 'enter');
  });

  $('#chat_box').keypress(function(e) {
    if (e.which == 13) {
      // emits event just for this socket
      if(!!socket.username){
        socket.emit('speak', {message: socket.username + ': ' + $('#chat_box').val()});
      } else {
        socket.emit('speak', {message: $('#chat_box').val()});
      }
      $('#chat_box').val('');
    }
  });

  socket.on('speak', function(data){
    log_chat_message(data.message, 'speak');
  });

  socket.on('disconnect', function(data){
    log_chat_message(data.message, 'disconnect');
  });

  $('#username').keyup(function(){
    return socket.username = $('#username').val();
  });

});

