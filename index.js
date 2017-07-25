import express from "express";
const app = express();

app.get('/', function(request, response) {
  response.send('Hello World!')
})
