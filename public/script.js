$(document).ready(function () {
  var log_chat_message = function(message, type) {
    var li = $('<li />').text(message);

    if (type === 'enter') {
      li.css({'color': 'red'});
    } else if (type === 'speak') {
      li.css({'color': 'blue'});
    } else if (type === 'disconnect') {
      li.css({'font-weight': 'bold', 'color': '#B30'});
    }

    $('#chat_log').append(li);
  };

  var socket = io.connect('http://localhost:3000');

  socket.on('entrance', function(data) {
    log_chat_message(data.message, 'enter');
  });

  $('#chat_box').keypress(function(event) {
    if (event.which == 13) {
      // emits event just for this socket
      socket.emit('speak', {message: $('#chat_box').val()});
      $('#chat_box').val('');
    }
  });

  socket.on('speak', function(data) {
    log_chat_message(data.message, 'speak');
  });


  socket.on('disconnect', function(data) {
    log_chat_message(data.message, 'disconnect');
  });


});