"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { top50 } = require('./data/top50');

const handleRank = (req,res) => {
  const rank = parseInt(req.params.rank);
    //console.log(rank);
  const songObj = top50.find(item => item.rank === rank); 
    //console.log(top50);
    //console.log(songObj);
    if (songObj) {
      res.json({status: 200, data: songObj}) 
    } else {
      res.json({status: 404, message: "Song not found."}) 
    }
}

const handleArtist = (req,res) => {
  const artist = req.params.artist;
  const artistObj = top50.filter(item => item.artist.toLowerCase().replace(" ","") === artist.toLowerCase()); 
  //console.log(artistObj);
  
    if (artistObj != 0) { 
      res.json({status: 200, data: artistObj}) 
    } else {
      res.json({status: 404}) 
    }
}

const handlePopularArtist = (req, res) => {
  const artistList = top50.map( item => item.artist)
    //console.log(artistList)
  let artist;
  for (let i = 0; i < artistList.length; i++) {
    if (artistList[0] === artistList[i] || artistList[i] === artistList[i+1]) {
      artist = artistList[i];
    }
  }
    //console.log(artist)
  const artistObj = top50.filter(item => item.artist.toLowerCase().replace(" ","") === artist.toLowerCase().replace(" ",""));
    //console.log(artistObj);
  res.json( {status: 200, data: artistObj}) 
}

const handleArtistArray = (req, res) => {
  const artistList = top50.map( item => item.artist)
  res.json( {status: 200, data: [... new Set (artistList.sort())]}) 
  //console.log(artistList);
}




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
  .get('/', (req, res) => {
    res.status(200).json({status: 200, data: top50}) ;
  })

  .get('/top50/song/:rank', handleRank)
  .get('/top50/artist/:artist', handleArtist)
  .get('/top50/popular-artist', handlePopularArtist)
  .get('/top50/artist', handleArtistArray)

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
