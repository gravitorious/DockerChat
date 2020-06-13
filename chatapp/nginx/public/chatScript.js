const username = prompt("What is your username?")
const socket = io('83.212.77.36:81', {
    query: {
        username
    },
    // WARNING: in that case, there is no fallback to long-polling
    transports: ['websocket'] // or [ 'websocket', 'polling' ], which is the same thing
}); // /endpoint
let nsSocket = "";

//listener for nsList
socket.on('nsList', (nsData)=>{
    let namespacesDiv = document.querySelector('.namespaces'); //get class namespaces
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns)=>{
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" /></div>`
    })

    //click listener for each namespace

    //loop through everything within the class of namespace
    Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        elem.addEventListener('click', (ev)=>{
            const nsEndPoint = elem.getAttribute('ns'); //ns attribute which is /mozilla etc.
            joinNs(nsEndPoint)
        })
    })

    //user connects to first namespace and first room at the beginning.
    const topNs = document.getElementsByClassName('namespace').item(0)
    const topNsName = topNs.getAttribute('ns')
    joinNs(topNsName);
})
