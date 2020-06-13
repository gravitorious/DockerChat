const express = require('express');
const app = express();
const socketio = require('socket.io')

let namespaces = require('./data/namespaces');
//middleware
//Each app.use(middleware) is called every time a request is sent to the server.
//express.static for static files. We serve a static file.
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000); //listening to http server, 9000 port.
const io = socketio(expressServer) //out socket io server is listening to the http server


const redis = require('socket.io-redis')
io.adapter(redis({ host: '83.212.77.36', port: 83 }));


/*
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const socketio = require('socket.io')
const PORT = 9000;
server.listen(PORT);
app.use(express.static(__dirname + '/public'));

const io = socketio(server) //out socket io server is listening to the http server
var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));
let namespaces = require('./data/namespaces');*/


//it emits it, when client connects on the page, on main namespace.
io.of('/').on('connection', (socket)=>{
    //socket.handshake header of reuqest
    //build an array to send back with the img and endpoint for each NS
    let nsData = namespaces.map((ns)=>{  //ns: each namespace
        return{
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    //send namespace data to the client (we use socket for this).
    socket.emit('nsList', nsData)
})


namespaces.forEach((namespace)=>{
    io.of(namespace.endpoint).on('connection', (nsSocket)=>{
        const username = nsSocket.handshake.query.username;
        //a socket has connected to chatgroup namespace
        //sending the namespace group info back
        nsSocket.emit('nsRoomLoad', namespace.rooms)
        nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallBack)=>{

            const roomToLeave = Object.keys(nsSocket.rooms)[1];
            nsSocket.leave(roomToLeave)
            updateUsersInRoom(namespace, roomToLeave)
            nsSocket.join(roomToJoin)
            //get all clients
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomToJoin;
            })
            if(nsRoom === undefined){}
            else{
                //nsSocket.emit('historyCatchUp', nsRoom.history);
            }
            //send back the new number of users connected to this room
            updateUsersInRoom(namespace, roomToJoin)
        })
        nsSocket.on('newMessageToServer', (msg)=>{
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: username,
                avatar: 'https://via.placeholder.com/30'
            }
            //send this message to all sockets that are in this room (that socket is)
            //user will be in the 2nd room in the object list
            //socket always joins its own room on connection
            const roomTitle = Object.keys(nsSocket.rooms)[1];
            //find room object from this room
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomTitle;
            })
            if(nsRoom === undefined){}
            else{
                nsRoom.addMessage(fullMsg);
                io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg)
            }
        })
    })
})

function updateUsersInRoom(namespace, roomToJoin){
    io.of(namespace.endpoint).in(roomToJoin).clients((error, clients)=>{
        io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', clients.length)
    })
}