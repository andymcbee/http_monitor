# http_monitor

A tool to monitor expternal domains.

# Installing http_monitor

Install Node and npm on your machine

### 1. Clone the Repo

Create a folder on your machine and then run the following git clone command in the terminal from your new folder:

git clone git@github.com:andymcbee/http_monitor.git

### 2. Change into the Backend directory

CD into the backend directory

### 3. Setup .env or .docker.env file

If you're running locally, create a .env file and fill it out as per .example.env file instructs.

If you're running Docker, create a .docker.env file and fill it out as per .example.env file instructs.

# Running the app

### Local setup

From within the /backend directory, run "npm install" to install all dependencies

Then, run the migration file to create a database that you'll need on startup. You need your ENV file setup first.

You can do so with this command:

NODE_ENV=development node ./db/migrations/1.js

Then you can run the app with:

npm run dev

Server should now be available at localhost:3000

Check available API calls here: https://www.postman.com/red-meteor-95332/workspace/http-monitor/collection/13365999-c6ec7756-5197-40af-aa2b-fb0f313a730e?action=share&creator=13365999

### Docker setup

Navigate to the /backend directory

Create images:

sudo docker build . --tag node-server

Build + run docker compose: (detached mode)

sudo docker-compose up --build -d

Run DB migration file:

sudo docker exec backend_server_1 npm run migrate

Server should now be available at localhost:3000

Check available API calls here: https://www.postman.com/red-meteor-95332/workspace/http-monitor/collection/13365999-c6ec7756-5197-40af-aa2b-fb0f313a730e?action=share&creator=13365999
