const path = require('path');
const express = require('express');
const socketIO=require('socket.io');
const http=require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
const {generateMessage}=require('./utils/message')
app.use(express.static(publicPath));
var server=http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket)=>{
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'))
  console.log("New User Connected");
  socket.on('disconnect',()=>{
    console.log('disconnected from client');
  });
  // socket.emit('newEmail',generateMessage('rishabh','How r u?'));
  // socket.on('createEmail',(createdEmail)=>{
  //  console.log("created Email",createdEmail);
  // });
  // socket.emit('newMessage',generateMessage('Servesh','hey'));
  socket.on('createMessage',(createMessage)=>{
    console.log("Create Message",createMessage);
    socket.broadcast.emit('newMessage',generateMessage(createMessage.from,createMessage.text));
  
  })
})
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
