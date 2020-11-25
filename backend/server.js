"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { top50 } = require("./data/top50.js"); 

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

  // ALL SONGS ENDPOINT
  .get('/top50', (req, res) => {
    res.status(200).json( {status: 200, data: top50 });
  })

  // SPECIFIC SONG ENDPOINT
  .get('/top50/song/:rank', (req, res) => {
    const rank = parseInt(req.params.rank);
    const song = top50.find((entry) => {
        return entry.rank === rank;
    })
    if (!song) {
      res.status(404).json({ status: 404, message: "Song not found."});
    }
    else {
      res.status(200).json( {status: 200, data: song });
    }
  })

  // SPECIFIC ARTIST
  .get('/top50/artist/:name', (req, res) => {
    const name = req.params.name;
    const artistName = top50.find((entry) => {
      let newArtistName = entry.artist.split(" ").join("");
      return newArtistName.toLowerCase() === name.toLowerCase();
    })
    // console.log("the artist is", artistName);
    if (artistName === []) {
      console.log("hello");
      res.status(404).json({ status: 404, message: "Artist not found."});
    } else {
      res.status(200).json( { status: 200, data: artistName });
    }
  })

  // TOP ARTIST
  .get('/top50/popular-artist', (req, res) => {
    let countObject = {};
    let countOrderArray = [];
    let artistsOnly = top50.map((entry) => {
      return entry.artist;
    })
    artistsOnly.forEach((artist) => {
      if (countObject[artist]) {
        countObject[artist]++;
      } else {
        countObject[artist] = 1;
      }
    })
    for (var artist in countObject) {
      countOrderArray.push([artist, countObject[artist]]);
    }
    countOrderArray.sort((a,b) => {
      return b[1] - a[1];
    })
    let topArtist = top50.filter((entry) => {
      if (entry.artist.toLowerCase() === countOrderArray[0][0].toLowerCase()) {
        return entry;
      }
    })
    res.status(200).json( { status: 200, data: topArtist });
  })

  // ARRAY OF ARTISTS
  .get('/top50/artist', (req, res) => {
    let onlyArtists = new Set (top50.map((entry) => entry.artist));
    // let onlyArtistsJSON = JSON.parse(onlyArtists);
    console.log(onlyArtists)
    res.status(200).json( { status: 200, data: [...onlyArtists] } );
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

  // ISSUES:
  // artist not found not working
  // artist endpoint doesn't display data???
