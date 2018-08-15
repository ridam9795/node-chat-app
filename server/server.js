const path = require('path');
const express = require('express');
const socketIO=require('socket.io');
const http=require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));
var server=http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket)=>{
  console.log("New User Connected");
  socket.on('disconnect',()=>{
    console.log('disconnected from client');
  });
  socket.emit('newEmail',{
    from:"rishabh2gmail.com",
    text:"how are u?",
    complatedAt:133
  });
  socket.on('createEmail',(createdEmail)=>{
   console.log("created Email",createdEmail);
  });
  socket.emit('newMessage',{
    from:'Servesh',
    text:"hey",
    complatedAt:233
  });
  socket.on('createMessage',(createMessage)=>{
    console.log("Create Message",createMessage);
  })
})
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
