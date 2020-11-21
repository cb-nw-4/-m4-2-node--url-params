"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const { top50 } = require('./data/top50');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  
  //exercise 2
  .get("/top50/", (req, res)=>{
      res.status(200).json({status:200, data: top50});
  })
  //exercise 3
  .get("/top50/songs/:number", (req, res)=>{
    if(req.params.number<=50 && req.params.number>=0){
      res.status(200).json({status:200, data: top50[req.params.number-1]});
    }
    else{
      res.status(404).json({status:404, message:"Song not found"});
    }
    
  })

  //exercise 4
  .get("/top50/artist/:artistName", (req, res)=>{
    const artistObject=top50.filter(element=>{
      if(element.artist.toLowerCase()===req.params.artistName.toLowerCase()){
        return element;
      }
    })
    console.log(artistObject);
    if(artistObject.length===0){
      res.status(404).json({status:404, message:"Song not found"})
    }
    else{
      res.status(200).json({status:200, data:artistObject})
    }
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
