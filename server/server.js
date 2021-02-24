const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');




const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));

const users = {};

io.on('connection' , socket =>{
    socket.on('new-user-joined' , name =>{
        // console.log('New user' , name);
        
        users[socket.id] = name;
        socket.broadcast.emit('user-joined' , name);
    });

    socket.on('send' , message =>{
        socket.broadcast.emit('recieve' , {message : message , name : users[socket.id]})
    });

    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left' , users[socket.id]);
        delete users[socket.id];
    });
    
});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
})
