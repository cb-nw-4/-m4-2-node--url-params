"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Require the DATA
const { top50 } = require("./data/top50");

// FUNCTIONS
const handleList = (req, res) => {
  res.status(200).json({ status: 200, data: top50 });
};

const handlePopularArtist = (req, res) => {
  const artists = [];
  const artistCount = {};
  top50.forEach((song) => {
    if (!artists.includes(song.artist)) {
      artists.push(song.artist);
    }
  });
  artists.forEach((artist) => {
    let count = 0;
    top50.forEach((song) => {
      if (song.artist === artist) count += 1;
    });
    artistCount[artist] = count;
  });

  const rankedArtists = [];
  Object.values(artistCount).forEach((count, id) => {
    const artist = Object.keys(artistCount)[id];
    rankedArtists.push({
      artist: artist,
      count: count,
    });
  });
  const mostPopularArtist = rankedArtists.sort((a, b) =>
    a.count < b.count ? 1 : -1
  )[0].artist;

  res.status(200).json({
    status: 200,
    data: top50.filter((song) => song.artist === mostPopularArtist),
  });
};

const handleSongRank = (req, res) => {
  const rank = req.params.rank - 1;
  top50[rank]
    ? res.status(200).json({ status: 200, data: top50[rank] })
    : res.status(404).json({ status: 404, message: "Song not found." });
};

const handleFourOhFour = (req, res) => {
  res.status(404).json({ status: 404, message: "not found." });
};

const handleArtist = (req, res) => {
  const name = req.params.name;
  const songs =
    top50.filter((song) => song.artist.toLowerCase() === name.toLowerCase()) ||
    [];
  songs.length > 0
    ? res.status(200).json({ status: 200, data: songs })
    : res.status(404).json({ status: 404, message: "Artist not found." });
};

const handleAllArtists = (req, res) => {
  const artists = top50.map((song) => song.artist);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  const noDuplicates = new Set(artists);
  res.status(200).json({ status: 200, data: [...noDuplicates] });
};

// SERVER SETUP
const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// endpoints
app.get("/top50", handleList);
app.get("/top50/popular-artist", handlePopularArtist);
app.get("/top50/artist/:name", handleArtist);
app.get("/top50/artist", handleAllArtists);
app.get("/top50/song/:rank", handleSongRank);

// handle 404s
app.get("*", handleFourOhFour);

app.listen(8000, () => console.log(`Listening on port 8000`));
