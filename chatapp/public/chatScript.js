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
    joinNs('/wiki')
})
