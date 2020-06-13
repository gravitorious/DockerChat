# DockerChat
Dockerized chat with socketio.
Project for Cloud Development at University of West Attica, Department of Computer Engineering and Informatics.
161014
161050
cse46097
# Installation
Firstly, you have to change the IPs and ports from chatapp, depending on the IPs and exposed ports of your Docker Swarm. 
After, from each worker and from folder “chatapp/scripts/” , you have to run
``` 
makefile worker
```
and from manager of your swarm from the same folder, you run
```
makefile manager
```
to deploy the dockerchat.