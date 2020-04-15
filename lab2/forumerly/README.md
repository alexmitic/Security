# forumerly
A web forum with all basic functionality intended as a project to help me master Node.js, Express, and MongoDB app development.

live at https://forumerly.herokuapp.com/


# Requirements 
- Docker
- Node

# How to launch
- Run Authentication Server, Redis and MongoDB services. Use  ```./launch.sh``` to enable the services
- Run ```node app.js``` and open the browser in ```localhost:3000```
- Stop the third-party services running ```./stop.sh```
- Wipe the data of the third-party services running ```./wipe.sh```
