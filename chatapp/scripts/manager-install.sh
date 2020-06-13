


docker build -t nginx_build ../nginx/
docker stack deploy --compose-file ../docker-compose.yml appservice

