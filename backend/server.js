"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const data = require("./data/top50");

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
      data: data.top50,
    });
  })

  .get("/top50/song/:rank", (req, res) => {
    const rank = parseInt(req.params.rank);
    const findSong = data.top50.find((song) => {
      return song.rank === rank;
    });
    if (findSong) {
      res.status(200).json({
        status: 200,
        data: findSong,
      });
    } else {
      res.status(404).json({
        status: 404,
      });
    }
  })

  .get("/top50/artist/:singer", (req, res) => {
    const singer = req.params.singer.toLowerCase();
    console.log(singer);
    const newData = data.top50.map((song) => {
      return { ...song, artist: song.artist.toLowerCase() };
    });
    console.log(newData);
    const filterArtist = newData.filter((song) => {
      return singer === song.artist;
    });
    if (filterArtist) {
      res.status(200).json({
        status: 200,
        data: filterArtist,
      });
    } else {
      res.status(404).json({
        status: 404,
      });
    }
  })

  .get("/top50/popular-artist", (req, res) => {
    const newObj = {};

    data.top50.forEach((song) => {
      if (!newObj[song.artist]) {
        newObj[song.artist] = 1;
      } else {
        newObj[song.artist] = newObj[song.artist] + 1;
      }
    });

    const objToArr = Object.entries(newObj);
    const sortedArr = objToArr.sort((a, b) => {
      return a[1] - b[1];
    });
    const topArtist = sortedArr[sortedArr.length - 1];
    console.log(topArtist)
    const filteredData = data.top50.filter(el => {
      return el.artist === topArtist[0]
    })

    res.status(200).json({
      status: 200,
      data: filteredData
    });
  })

  .get('/top50/artist', (req,res) => {
    const listOfArtists = data.top50.map(el => {
      return el.artist
    })
    const cleanedArtistArr = new Set(listOfArtists)
    const setToArr = [...cleanedArtistArr]

    res.status(200).json({
      status: 200,
      data: setToArr
    })
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
