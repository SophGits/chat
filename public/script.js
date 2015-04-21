$(document).ready(function () {
  var log_chat_message = function  (message) {
    var li = $('<li />').text(message);
    $('#chat_log').append(li);
  };

  var socket = io.connect('http://localhost:3000');

  socket.on('entrance', function  (data) {
    log_chat_message(data.message);
  });

  $('#chat_box').keypress(function (event) {
    if (event.which == 13) {
      // emits event just for this socket
      socket.emit('speak', {message: $('#chat_box').val()});
      $('#chat_box').val('');
    }
  });

  socket.on('speak', function  (data) {
    log_chat_message(data.message);
  });


});