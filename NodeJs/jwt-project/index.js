//This is the start for application

const http = require("http");


const app = require("./app"); //It will go to app    
const server = http.createServer(app); //Create a server

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT; //take a port fro

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


