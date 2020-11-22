"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { top50 } = require("./data/top50");

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

  .get('/top50', (req, res) => {
    res.status(200).json({
      "status": 200,
      "data": top50,
    });
  })


  .get('/top50/song/:id', (req, res) => {
    const { id } = req.params;

    let song = top50.filter(song => song.rank.toString() === id);

    if (song.length > 0) {
      res.status(200).json({
        "status": 200,
        "data": song[0],
      })
    } else {
      res.status(404).json({
        "status": 404,
        "message": "Song not found.",
      });
    }
  })


  .get('/top50/artist/:id', (req, res) => {
    const { id } = req.params;

    let artist = top50.filter(song => song.artist.toString() === id);

    console.log(artist);

    if (artist.length > 0) {
      res.status(200).json({
        "status": 200,
        "data": artist,
      })
    } else {
      res.status(404).json({
        "status": 404,
        "message": "Artist not found",
      });
    }
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "It works now.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
