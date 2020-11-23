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

  // Return all songs
  .get('/top50', (req, res) => {
    res.status(200).json({ status: 200, data: top50 });
  })

  // Return song by rank
  .get('/top50/song/:rank', (req, res) => {
    const rank = Number(req.params.rank);
    const result = top50.filter((song) => song.rank === rank);

    if (result.length > 0) {
      const [song] = result;
      res.status(200).json({ status: 200, data: song });
    } else {
      res.status(404).json({ status: 404, message: 'Song not found'});
    }
  })

  // Return song by artist
  .get('/top50/artist/:artist', (req, res) => {
    const artist = req.params.artist.toLowerCase();
    const result = top50.filter((song) => song.artist.toLowerCase() === artist);

    if (result.length > 0) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, message: 'Song not found'});
    }
  })

  // Return most popular artist
  .get('/top50/popular-artist', (req, res) => {
    // Get count of all artists
    let entries = {};

    for (let i = 0; i < top50.length; i++) {
      if (entries.hasOwnProperty(top50[i].artist)) {
        entries[top50[i].artist] = entries[top50[i].artist] + 1;
      } else {
        entries[top50[i].artist] = 1;
      }
    }

    // Find the highest count
    let highCount = 0;

    Object.values(entries).forEach(count => {

      if (count > highCount) {
        highCount = count;
      }
    });

    // Return all entries equal to the high count.  This will
    // catch ties.
    let result = [];

    for (const [key, value] of Object.entries(entries)) {
      if (value === highCount) {
        result = [...result, ...top50.filter(song => song.artist === key)];
      }
    }

    res.status(200).json({ status: 200, data: result });
  })

    // Return a list of unique artists
    .get('/top50/artist', (req, res) => {
      const artistSet = new Set();

      top50.forEach(song => artistSet.add(song.artist));
      res.status(200).json({ status: 200, data: [...artistSet] });
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
