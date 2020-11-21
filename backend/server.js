"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const data = require('./data/top50')


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

    .get('/top50', (req,res) => {
      res.status(200).json({
        status: 200,
        data: data.top50
      })
    })


    .get('/top50/song/:rank', (req,res) => {
      const rank = parseInt(req.params.rank)
      const findSong =  data.top50.find(song => {
        return song.rank === rank
      })
      if(findSong){
        res.status(200).json({
          status: 200,
          data: findSong
        })
      } else {
        res.status(404).json({
          status: 404
        })
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
