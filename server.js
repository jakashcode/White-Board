

const express = require('express');

const app = express();

//1 
const server = require('http').Server(app);
//2
const io = require('socket.io')(server);

const path=require("path");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection", function(socket) {
    console.log(socket.id);
    socket.on("color",function(color){
        socket.broadcast.emit("oncolorChange",color)
    })

    socket.on("mymousedown",function(point){
        socket.broadcast.emit("mymousedown",point)
    })
    socket.on("mymousemove",function(point){
        socket.broadcast.emit("mymousemove",point)
    })
    socket.on("mymouseup",function(){
        socket.broadcast.emit("mymouseup");
    })
    socket.on("sizechange",function(size){
        socket.broadcast.emit("sizechange",size);
    })
    // (joined)client->server
    
  });
// GET,POST,DELETE,PATCH
//3

// console.log(process.env.PORT);
const port=process.env.PORT||3000;

server.listen(port,function(){
    console.log("server is listening at port 3000");
});