"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const top50 = require('./data/top50');
const popularSongsArr = top50.top50;

const handleSongs = (req, res) => {
  res.status(200).json({ status: 200, data: popularSongsArr });
}

const handleEachSong = (req, res) => {
  const rank = req.params.rank;
  const song = popularSongsArr.find((song) => {
    return song.rank === parseInt(rank);
  })
  if (song) {
    res.status(200).json({ status: 200, data: song });
  }
  else {
    res.status(404).json({ status: 404, message: 'Song not found.' });
  }
}

const handleByArtistName = (req, res) => {
  const artistName = req.params.artistName.toLowerCase();
  const song = popularSongsArr.filter((song) => {
    return song.artist.toLowerCase() === artistName;
  })
  if (song.length > 0) {
    res.status(200).json({ status: 200, data: song });
  }
  else {
    res.status(404).json({ status: 404, message: 'Artist not found.' });
  }
}

const handlePopularArtist = (req, res) => {
  const artistArr = popularSongsArr.map((song) => {
    return song.artist;
  })
  
  let frequency = {};
  let key;
  for (let i = 0; i < artistArr.length; i++) {
      key = artistArr[i];
      if(key in frequency) {
          frequency[key]++;
      }
      else {
          frequency[key] = 1;
      }
  }

  let uniques = [];
  for (key in frequency) {
      uniques.push(key);
  }

  const compareFrequency = (a, b) => {
      return frequency[b] - frequency[a];
  }

  const artistArrByPopularity = uniques.sort(compareFrequency);
  const songsByMostPopularArtist = popularSongsArr.filter((song) => {
    return song.artist === artistArrByPopularity[0]
  })
  res.status(200).json({ status: 200, data: songsByMostPopularArtist });
}

const handleArtistListArr = (req, res) => {
  const artistSet = new Set();
  for (let i = 0; i < popularSongsArr.length; i++) {
    artistSet.add(popularSongsArr[i].artist);
  }
  const artistArr = [...artistSet];
  res.status(200).json({ status: 200, data: artistArr });
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
  .get('/top50', handleSongs)

  .get('/top50/song/:rank', handleEachSong)

  .get('/top50/artist/:artistName', handleByArtistName)

  .get('/top50/popular-artist', handlePopularArtist)

  .get('/top50/artist', handleArtistListArr)

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
