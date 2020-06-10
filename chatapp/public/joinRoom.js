function joinRoom(roomName){

    //send this roomName to the server
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers)=>{
        //update total room number
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`
    })
    nsSocket.on('historyCatchUp', (history)=>{
        const messagesUI = document.querySelector('#messages');
        messagesUI.innerHTML = "";
        history.forEach((msg)=>{
            const newMsg = buildHTML(msg);
            const currentMessages = messagesUI.innerHTML;
            messagesUI.innerHTML = currentMessages + newMsg;
        })
        messagesUI.scrollTo(0, messagesUI.scrollHeight)
    })

    nsSocket.on('updateMembers', (numMembers)=>{
        document.querySelector('.curr-room-num-users').innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span>`
        document.querySelector('.curr-room-text').innerText = `${roomName}`
    })

    let searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('input', (e)=>{
        let messages = Array.from(document.getElementsByClassName('message-text'))
        messages.forEach((msg)=>{
            if(msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1){
                msg.style.display = "none"
            }
            else{
                msg.style.display = "block"
            }
        })
    })
}