#! /bin/bash
VERSION=2.1.0

aws ecr get-login-password --region eu-west-1 --profile dstv-aws-master | docker login --username AWS --password-stdin 240247221724.dkr.ecr.eu-west-1.amazonaws.com

docker-compose build

docker tag prerender-docker_prerender_server:latest 240247221724.dkr.ecr.eu-west-1.amazonaws.com/prerender-server:latest
docker tag prerender-docker_prerender_server:latest 240247221724.dkr.ecr.eu-west-1.amazonaws.com/prerender-server:${VERSION}
docker push 240247221724.dkr.ecr.eu-west-1.amazonaws.com/prerender-server:latest
docker push 240247221724.dkr.ecr.eu-west-1.amazonaws.com/prerender-server:${VERSION}

docker tag prerender-docker_nginx_proxy:latest 240247221724.dkr.ecr.eu-west-1.amazonaws.com/prerender-web:latest
docker tag prerender-docker_nginx_proxy:latest 240247221724.dkr.ecr.eu-west-1.amazonaws.com/prerender-web:${VERSION}
docker push 240247221724.dkr.ecr.eu-west-1.amazonaws.com/prerender-web:latest
docker push 240247221724.dkr.ecr.eu-west-1.amazonaws.com/prerender-web:${VERSION}