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
  })
})
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
