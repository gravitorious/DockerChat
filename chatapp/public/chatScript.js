const socket = io('http://localhost:9000'); // /endpoint


/* me to pou kanei syndesh
socket.on('connect', ()=>{

})*/

//listener for nsList
socket.on('nsList', (nsData)=>{
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns)=>{
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" /></div>`
    })

    //click listener for each namespace

    Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        elem.addEventListener('click', (ev)=>{
            const nsEndPoint = elem.getAttribute('ns');
        })
    })
    const nsSocket = io('http://localhost:9000/wiki')
    nsSocket.on('nsRoomLoad', (nsRooms)=>{
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = ""
        nsRooms.forEach((room) =>{
            let glyph;
            if(room.privateRoom){
                glyph = 'lock'
            }
            else {
                glyph = 'globe'
            }
            roomList.innerHTML += `<li class="room"><span class ="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
        })
        let roomNodes = document.getElementsByClassName('room')
        Array.from(roomNodes).forEach((elem)=>{
            elem.addEventListener('click', (e)=>{
                console.log("Someone clicked on ", e.target.innerText);
            })
        })
    })
})

socket.on('messageFromServer', (dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit('dataToServer', {data: "Data from the client!"})
})