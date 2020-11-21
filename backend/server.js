"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')

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
  .get("/top50", (req, res) => {
    res.status(200).json({
      status: 200,
      data: top50,
    });
  })

  .get("/top50/song/:rank", (req, res) => {
    const rank = parseInt(req.params.rank,10); 
    const song = top50.filter((element)=> {
      return element.rank === rank;
    });
    if (song.length>0) {
      res.status(200).json({
        status: 200,
        data: song[0],
      });
    } else {
      res.status(200).json({
        status: 404,
        message: "Song not found.",
      });
    }; 
  })

  .get("/top50/artist/:artist", (req, res) => {
    const artist = req.params.artist; 
    const artistArray = top50.filter((element)=> {
      return element.artist.toLowerCase() === artist.toLowerCase();
    });
    if (artist.length>0) {
      res.status(200).json({
        status: 200,
        data: artistArray,
      });
    } else {
      res.status(200).json({
        status: 404,
        message: "Artist not found.",
      });
    }; 
  })

  .get('/top50/popular-artist',(req,res)=> { 
    let popularArtist; 
    let popularCount = 0; 
    let findPopularArtist = top50.forEach((element)=>{
      let count = 0; 
      top50.forEach((element2)=>{
        if(element.artist === element2.artist) {
          count ++; 
        };
      });
      if (count > popularCount) { 
        popularCount = count;
        popularArtist = element.artist; 
      }
    });
    let popularArtistSongs = top50.filter((element)=> {
      return element.artist===popularArtist; 
    });
    res.status(200).json({
      status:200,
      data: popularArtistSongs,
    });
  })

  .get('/top50/artist',(req,res)=> { 
    let setOfArtists = new Set(); 
    top50.map((element)=> {
      setOfArtists.add(element.artist);
    }); 
    res.status(200).json({
      status: 200,
      data: [...setOfArtists],
    });
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
