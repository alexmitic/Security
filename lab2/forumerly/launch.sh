# DO NOT touch

# run your container
sudo docker start lbs-services || sudo docker run -it -p 6379:6379 -p 8087:8087 -p 27017-27019:27017-27019 --name lbs-services jacarte/lbs-services:latest