"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {top50} = require('./data/top50')

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

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "Working now.",
    });
  })

  .get("/top50", (req, res) => {
    res.status(200).json({
      status: 200,
      data: top50,
    });
  })

  .get("/top50/song/:id", (req, res) => {
    const rank = Number(req.params.id);
    const pick = top50.filter((song) => song.rank === rank);
    if (pick.length > 0) {
      const [song] = pick;
    res.status(200).json({ status: 200, data: song });
    } else {
      res.status(200).json({ status: 404, message: "Song not found." });
    }
  })

  .get("/top50/artist/:id", (req, res) => {
    const artist = req.params.id.toLowerCase();
    console.log(artist);
    const pick = top50.filter((song) => song.artist.toLowerCase() === artist);
    if (pick.length > 0) {
    res.status(200).json({ status: 200, data: pick });
    } else {
      res.status(200).json({ status: 404, message: "Song not found." });
    }
  })

    .get("/top50/popular-artist", (req, res) => {
      const artists = top50.map((song) => {
        return song.artist;
      })
      let mf = 1;
      let m = 0;
      let artist;
      for (let i = 0; i < artists.length; i++) {
        for (let j = i; j < artists.length; j++) {
          if (artists[i] == artists[j]) {
            m++;
          }
          if (mf < m) {
            mf = m;
            artist = artists[i];
          }
        }
        m = 0;
      }
      const pick = top50.filter((song) => song.artist === artist);
      res.status(200).json({ status: 200, data: pick });
    })
    
    .get("/top50/artist", (req, res) => {
      let artists = top50.map((song) => {
        return song.artist;
      })
      function duplicates(arr) {
        arr.splice(0, arr.length, ...(new Set(arr)))
      };

      duplicates(artists);
      
      res.status(200).json({ status: 200, data: artists });
    })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
