$(document).ready(function () {
  var log_chat_message = function  (message) {
    var li = $('<li />').text(message);
    $('#chat_log').append(li);
  };

  var socket = io.connect('http://localhost:3000');

  socket.on('entrance', function  (data) {
    log_chat_message(data.message);
  });
});