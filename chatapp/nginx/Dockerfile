FROM nginx:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .



RUN cp  /usr/src/app/public/* /usr/share/nginx/html/
