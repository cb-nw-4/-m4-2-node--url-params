'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const top50 = require('./data/top50');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get('/top50', (req, res) => {

    const { top50 } = require('./data/top50');
    
    res.status(200).json({
      status: 200,
      data: top50 })
  })

  .get('/top50/song/:rank', (req, res) => {

    const { top50 } = require('./data/top50');

    const rank = parseInt(req.params.rank);

    const item = top50.filter((item) => {
      if (item.rank === rank) {
        return res.status(200).json({status: 200, data: item });
      } else if (rank > 50) {
        return res.status(404).json({status: 404, message: 'Song not found.'})
      }
    })
  })

  .get('/top50/artist/:artist', (req, res) => {

    const { top50 } = require('./data/top50');

    const artist = req.params.artist;

    const item = top50.filter((item) => {
      if (item.artist.toLowerCase() === artist.toLowerCase()) {
        return item;
      }
  })
  res.status(200).json({ status: 200, data: item })
})

.get('/top50/popular-artist', (req, res) => {

  const { top50 } = require('./data/top50');
  
  const artists = top50.map((item) => {
    return item.artist;
  })
  const artistList = Object.values(artists)
  const artistCount = artistList.reduce((artist, count) => {
    artist[count] = (artist[count] || 0) + 1;
    return artist;
  }, {});

  const ranking = Object.entries(artistCount).sort((a,b) => {
    if (b[1] > a[1]) {
      return 1;
    } else if (b[1] < a[1]) {
        return -1;
      } else {
        if (a[0] > b[0]) return 1;
        else if(a[0] < b[0]) return -1;
        else return 0
      }
    })

    const topArtist = ranking[0][0];

    const topArtistInfo = top50.filter((item) => {
      if (item.artist.toLowerCase() === topArtist.toLowerCase()) {
        return item;
      }
  })
    
    res.status(200).json({ status: 200, data: topArtistInfo })

})

.get('/top50/artist', (req, res) => {

  const { top50 } = require('./data/top50');

  const artists = top50.map((item) => {
    return item.artist;
  })
  const artistArray = Object.values(artists)
  const artistList = artistArray.filter((a,b) => {
    return artistArray.indexOf(a) === b;
  });

  res.status(200).json({ status: 200, data: artistList })
})


  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'This is obviously not what you are looking for.',
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
