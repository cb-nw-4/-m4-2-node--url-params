"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {top50}= require("./data/top50");

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

  .get("/top50",(req,res)=>{
    res.status(200).json({
      status: 200,
      data: top50
    });
  })

  .get("/top50/song/:rank",(req,res)=>{

    const reqRank = req.params.rank;
    let songData = top50.filter((song)=> song.rank == reqRank);

    if(songData.length == 0){
      res.status(404).json({
        status: 404,
        message: "Song not found",
      });
    }else{
      res.status(200).json({
        status: 200,
        data: songData[0]
      });
    }
  })

  .get("/top50/artist/:artist", (req,res)=>{
    const reqArtist = req.params.artist;

    let songData = [];
    top50.forEach((song)=> song.artist.toLowerCase().includes(reqArtist)? songData.push(song):null );

    if(songData.length == 0){
      res.status(404).json({
        status: 404,
        message: "Artist not found",
      });
    }else{
      res.status(200).json({
        status: 200,
        data: songData
      });
    }
  })

  .get("/top50/artist",(req,res)=>{
    let artistList = top50.map((song)=>song.artist);
    let filteredList = [...new Set(artistList)];

    res.status(200).json({
      status: 200,
      data: filteredList
    });
  })

  .get("/top50/popular-artist", (req,res)=>{

    let artistList = top50.map((song)=>song.artist);
    let filteredList = [...new Set(artistList)];

    let dataObject = {};
    filteredList.forEach((artist)=>{
      dataObject[artist]=0;
    });

    //Count occurences
    top50.forEach((song)=>{
      if(song.artist in dataObject){
        dataObject[song.artist]++;
      }
    });

    //Find top artist
    let topArtist = "unknown";
    let ocurrences = 0;
    filteredList.forEach((artist)=>{
      if(dataObject[artist]>ocurrences){
        topArtist=artist;
        ocurrences=dataObject[artist];
      }
    });

    //Return artist songs
    let songList = [];
    top50.forEach((song)=> song.artist.includes(topArtist)? songList.push(song):null );

    res.status(200).json({
      status: 200,
      data: songList
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

