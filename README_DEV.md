# README for team members on dev process

## To run the app
1. clone the repo
2. you need two terminals open to run frontend and backend

### Run backend
2. cd project-ratemy/backend
3. npm install
4. node server.js

### Run frontend
1. cd project-ratemy/frontend
2. npm install
3. npm start
4. navigate to localhost:3000

## To develop

### Send http requests to backend
NOTE: currently it works for http requests, we need to make it work for https

There are many options for sending http requests to the backend api for testing. Of course, frontend will call all our backend endpoints, but for testing purposes you can use Postman or curl. 

Postman: download the app online, open it and create an account. You need to create a workspace, and in your workspace you should see one tab that says "Overview", next to it click the plus button and enter the url endpoint, the request method, and perhaps some data in the body. To see an image of this, I will post it in the setup-refs of our discord chat as image 1.

### To view database

Download MongoDB Compass from the internet. Click new connection and paste this
mongodb+srv://alina:ratemy23@cluster0.jl4uyby.mongodb.net/
in the URI field. Then click save and connect. If it works, you should see at least 3 databases admin, local, and test. Open the test one. You should see a collection called users which holds the data. Try sending a request with postman and check that the data is there.

## Git processes

### Branching
We will use the main branch as stable release branch. Our development branch is dev. We will branch off of dev, put up PRs to merge into dev and only occasionally when fully tested merge dev into main.

### Good practice
1. Make a branch per trello card
2. Name branches name/cardnumber-title
3. make sure commit names are descriptive
4. remove all console logs and commented out code
5. add code comments especially to confusing logic to make review easier
6. make sure to cite resources as thierry wants
7. put up a PR and get approval from at least one person

### Workflow
1. Open a terminal session
2. cd project-ratemy
3. already have dev branch
    - git checkout dev
    - git pull origin dev
4. dont have dev branch
    - git fetch origin dev
    - git checkout dev
5. develop
6. git add filenames
7. git commit -m "commit message"
8. git push origin branchName - make sure to never push to dev
