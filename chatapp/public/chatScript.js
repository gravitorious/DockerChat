const username = prompt("What is your username?")
const socket = io('http://localhost:9000', {
    query: {
        username
    }
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
    const topNs = document.getElementsByClassName('namespace').item(0)
    const topNsName = topNs.getAttribute('ns')
    joinNs(topNsName);
})
