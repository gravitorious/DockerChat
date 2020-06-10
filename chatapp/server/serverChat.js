const express = require('express');
const app = express(); //we will use this for get methods etc.
const socketio = require('socket.io')

//middleware
//Each app.use(middleware) is called every time a request is sent to the server.
//express.static for static files. We serve a static file.
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000); //listening to http server, 9000 port.
const io = socketio(expressServer) //out socket io server is listening to the http server
io.on('connection', (socket)=>{ //it emits it, when client connects on the page.
    socket.emit('messageFromServer', {data: "Welcome to the socketio server"})
    socket.on('messageToServer', (dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer', (msg)=>{
        io.emit('newMessageToClients', {text: msg.text});
    })
})