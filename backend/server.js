"use strict";

// import the needed node_modules.
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const data = require('./data/top50');


// Below are methods that are included in express(). We chain them for convenience.
// --------------------------------------------------------------------------------

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"))
app.use(bodyParser.json())

// Any requests for static files will go into the public folder
app.use(express.static("public"))

// Nothing to modify above this line
// ---------------------------------
// add new endpoints here 👇

app.get('/top50', (req, res) =>{

  res.status(200).json({
    status: 200,
    data: data.top50
  })

})


// add new endpoints here ☝️
// ---------------------------------
// Nothing to modify below this line

// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
})

// Node spins up our server and sets it to listen on port 8000.
app.listen(8000, () => console.log(`Listening on port 8000`));
