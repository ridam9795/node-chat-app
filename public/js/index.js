var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
socket.on('newLocationMessage',function(message){
  var formatedTime=moment(message.createdAt).format('LT');
var li=jQuery('<li></li>');
var a=jQuery('<a target="_blank">My current location</a>');
li.text(`${message.from} ${formatedTime}:`);
a.attr('href',message.url);
li.append(a);
jQuery('#messages').append(li);

})
socket.on('newMessage', function (message) {
   var formatedTime=moment(message.createdAt).format('LT')
  console.log('newMessage', message);
 var li=jQuery('<li></li>');
 li.text(`${message.from} ${formatedTime}:${message.text}`);
 jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
var messageTextbox=jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text:messageTextbox.val()
  }, function () {
      messageTextbox.val(' ');
  });
});
var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('geolocation is not supported by ur browser');
  }
  locationButton.attr('disabled','disabled').text("sending location ...");
  navigator.geolocation.getCurrentPosition(function(position){
console.log(position);
locationButton.removeAttr('disabled').text("Send location");
socket.emit('createLocationMessage',{
  latitude:position.coords.latitude,
  longitude:position.coords.longitude
});
  },function(error){
    locationButton.removeAttr('disabled').text("send location");
    alert('unable to fetch location')
  })
})
