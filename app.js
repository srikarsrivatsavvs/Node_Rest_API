//third party imports
const express = require("express");
const bodyParser = require("body-parser");

// instantiate express app
const app = express();

// middleware that only parses json
app.use(bodyParser.json());

//this middleware sets the appropriate headers for responses to avoid CORS erros.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//server running on port 80
app.listen(3000);
