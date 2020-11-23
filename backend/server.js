"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { top50 } = require("./data/top50");
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


//1. All data
  .get("/top50", (req, res) => {
    const data = top50;
    res.status(200).json({ status: 200, data });
  })

//2.Get the song object by its ranking
  .get("/top50/song/:rank", (req, res) => {
    let ranking = Number(req.params.rank);

    const filteredRanking = top50.filter((top) => top.rank === ranking);
    if (filteredRanking.length === 0) {
      res.status(400).json({ status: 400, message: "Song not found" });
      res.send("400, page not found");
    } else {
      res.status(200).json({ status: 200, data: filteredRanking });
    }
  })

  // replace(/\s/g, "")
//3.Get the song object by the artist's name
  .get("/top50/artist/:artist", (req, res) => {
    const name = req.params.artist;

    const data = top50.filter((top) =>{
       const match = (top.artist === name);
       return match
      });

    if (data.length <= 0) {
      res.status(400).json({ status: 400, message: "Artist not found" });
    } else {
      res.status(200).json({ status: 200, data });
    }
  })
//4.Get the most popular artist's songs
  .get("/top50/popular-artist", (req, res) => {
  
    let compare = 0;
    let count = {};
    let mostPopular;
    let artistName = top50.map((name) => {
      return name.artist;
    });

    const mostPop = (array) => {
      for (let i = 0; i < array.length; i++) {
        let name = array[i];
        if (count[name] === undefined) {
          count[name] = 1;
        } else {
          count[name] += 1;
        }
        if (count[name] > compare) {
          compare = count[name];
          mostPopular = array[i];
        }
      }
      return mostPopular;
    };
    let popular = mostPop(artistName);

    const data = top50.filter((pop) => {
      const match = (pop.artist === popular) 
        return match;
      
    });
    res.status(200).json({ status: 200, data });
    })


//5.List of all artists, no repetitions.
  .get("/top50/artist", (req, res) => {
const artistArray = [];
top50.forEach((track) => {
  artistArray.push(track.artist);
})
const data = [...new Set(artistArray)]





    res.status(200).json({status:200, data})
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
