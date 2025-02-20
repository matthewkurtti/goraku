# GoRaku

Making entertainment into language study

## Concept

Traditional language study can be boring (reading through grammar books, looking up boring words from the dictionary). That's where GoRaku comes in!

GoRaku aims to assist language learners who enjoy watching shows or anime in their target language. GoRaku can take an audio clip in the target language from your favorite show and automatically turn that audio into a text flash card with a front and back. The front is the original audio changed to text, and the back is the translation of the front text to english. GoRaku also lets you store these cards to study later.

## Try it out here ⬇️

### [GoRaku](https://goraku-kusp.onrender.com) 

## Setting up locally

1. Download or clone this repository

### Frontend

2. Navigate to the frontend and install dependencies
```console
cd ./client
npm install
```
3. To see the front end in a dev environment, run:
```console
npm run dev
```

### Backend

4. Navigate to the server and install dependencies
```console
cd ../server
npm install
```
5. To start the server, run:
```console
npm start
```

### Database
Before the server can run, the database and environment will need to be setup

6. Go into your local postgres and create the database:
```console
CREATE DATABASE goraku;
```

7. In the server directory, create a .env.local file with the following fields:
```console
DB_USER=<your local computer's postgres user>
DB_PASSWORD=<your local computer's postgres password>
DB_NAME=goraku
DB_HOST=localhost
DB_PORT=5432
SESSION_SECRET=<a session secret of your choice>
```
### Google APIs

This project utilizes google speech to text and google translate api for the app's mvp feature. All the general routes for the server will work with the setup up to this point. However, in order for the speech to text and translate routes to work in the server, additional setup is necessary. These apis are accessed with a service account, and to access the service account, a secret credentials file is necessary. That file will not be posted here. If you would like to attempt to use the apis in your local setup, feel free to message me directly for access to the credentials file.
