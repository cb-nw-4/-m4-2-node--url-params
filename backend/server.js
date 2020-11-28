"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

const { top50 } = require("./data/top50");

//express()
// Below are methods that are included in express(). We chain them for convenience.
// --------------------------------------------------------------------------------

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny")).use(express.json());

// Any requests for static files will go into the public folder
app.use(express.static("public"));

app.use(bodyParser.json());

// Nothing to modify above this line
// ---------------------------------
// add new endpoints here 👇
// FUNCTIONS;

const handleAllBySong = (req, res) => {
    const rank = req.params.rank;
    const song = top50.filter((song) => song.rank == rank);
    rank <= top50.length ?
        res.status(200).json({ data: song }) :
        res.status(404).json({
            status: 404,
            message: "Song not found.",
        });
};

const handleAllByArtist = (req, res) => {
    const artist = req.params.artist;
    const artistData = top50.filter(
        (artist1) => artist1.artist.toLowerCase() == artist.toLowerCase()
    );
    const array = top50.map((song) => song.artist.toLowerCase());
    array.includes(artist.toLowerCase()) ?
        res.status(200).json({ data: artistData }) :
        res.status(404).json({
            status: 404,
            message: "Song not found.",
        });
};

const handleAllPopularArtist = (req, res) => {
    const counted = top50.reduce((a, { artist }) => {
        a[artist] = a[artist] || { artist, count: 0 };
        a[artist].count += 1;
        return a;
    }, {});
    const sortedByName = Object.values(counted).sort((b, a) =>
        a.count > b.count ? 1 : -1
    )[0].artist;
    const returnallObjects = top50.filter(
        (object1) => object1.artist === sortedByName
    );
    res.status(200).json({ data: returnallObjects });
};

const handleAllListOfArtists = (req, res) => {
    const result = [...new Set(top50.map((data) => data.artist))];
    res.status(200).json({ data: result });
};

app.get("/top50", (req, res) => {
    res.status(200).json({ data: top50 });
});
app.get("/top50/song/:rank", handleAllBySong);
app.get("/top50/artist/:artist", handleAllByArtist);
app.get("/top50/popular-artist", handleAllPopularArtist);
app.get("/top50/artist", handleAllListOfArtists);
// add new endpoints here ☝️
// ---------------------------------
// Nothing to modify below this line

// this is our catch all endpoint.
app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
    });
});

// Node spins up our server and sets it to listen on port 8000.
app.listen(8000, () => console.log(`Listening on port 8000`));