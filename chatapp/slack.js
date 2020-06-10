const express = require('express');
const app = express(); //we will use this for get methods etc.
const socketio = require('socket.io')

let namespaces = require('./data/namespaces');
//middleware
//Each app.use(middleware) is called every time a request is sent to the server.
//express.static for static files. We serve a static file.
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000); //listening to http server, 9000 port.
const io = socketio(expressServer) //out socket io server is listening to the http server



io.of('/').on('connection', (socket)=>{ //it emits it, when client connects on the page, on main namespace.
    //build an array to send back with the img and endpoint for each NS
    let nsData = namespaces.map((ns)=>{
        return{
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    //send namespace data to the client (we use socket for this).
    socket.emit('nsList', nsData)
})








namespaces.forEach((namespace)=>{
    io.of(namespace.endpoint).on('connection', (socket)=>{
    })
})
