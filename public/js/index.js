var socket=io();
          socket.on('connect',()=>{
              console.log('connected to the server');
            //   socket.emit('createEmail',{
            //       to:"rishabh@gmail.com",
            //       text:"fine! how about you"
            //   });
            //   socket.emit('createMessage',{
            //     from:'Ridam',
            //     text:'hor r u'
            // })

          })
         
          socket.on('disconnect',()=>{
              console.log('disconnected from server');
          });
          socket.on('newEmail',function(email){
              console.log("New Email",email);
          });
          socket.on('newMessage',function(message){
              console.log("Message ",message);
          })