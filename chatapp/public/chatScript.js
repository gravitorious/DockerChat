const socket = io('http://localhost:9000'); //create the connection, returns the socket
socket.on('messageFromServer', (dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit('dataToServer', {data: "Data from the client!"})
})

document.querySelector('#message-form').addEventListener('submit', (event)=>{
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    console.log(newMessage)
    socket.emit('newMessageToServer', {text:newMessage})
})

socket.on('newMessageToClients', (msg)=>{
    console.log(msg)
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})