# FlixNet - backend
It is the backend code for the Angular project [here](https://github.com/TejaSaii/Flixnet-frontend)

## About the API
* POST - /auth/signup - accepts email, password, age - validates user info and provides jwt token
* POST - /auth/login - accepts email, password - logs in user and provides jwt token
* GET - /app/videos - accepts three query params (page, keyword, type) - provides list of videos based on the query params used - provides paginated result, or resuls based on search keyword or filtering based on type and even a mix of all three
* GET - /app/video/showId - provides all the details of a particular video based on the showId passed.

## Build Process
* Add .env file with two variables `DB_HOST='YOUR_MONGO_CLUSTER_URI'`  `SECRET='YOUR_SECRET_FOR_JWT'`
* `npm i` to install all the dependencies
* `npm run build` to build the project
* `npm run start` to start the server
* go to 'localhost:3000' to test the server

