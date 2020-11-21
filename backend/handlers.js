  
const { top50 } = require('./data/top50')

const handleTop50Request = (req, res) => {
  res.status(202).json({
    status: 202,
    data: top50
   });
};

const handleRankSongRequest = (req, res) => { 
  const requestSong = top50.filter((song) => (req.params.rank === song.rank.toString()));  
  requestSong.length === 0 ? res.status(404).json({ status: 404, data: "Song not found." }):
                             res.status(200).json({ status: 200,  data: requestSong });
  
};

const handleArtistSongsRequest = (req, res) => { 
  const requestSong = top50.filter((song) => (req.params.name.toLowerCase() === song.artist.toLowerCase()));  
  requestSong.length === 0 ? res.status(404).json({ status: 404, data: "Artist not found." }):
                             res.status(200).json({ status: 200,  data: requestSong });
};

const handleMostPopularArtist = (req, res) => { 
  const numberSongsPerArtist = {};
  top50.forEach((song) => {
    numberSongsPerArtist[song.artist] = numberSongsPerArtist[song.artist] === undefined ? [song] : [...numberSongsPerArtist[song.artist], song];
  });

  let sortedArr = Object.keys(numberSongsPerArtist).sort(function(a,b){
    return numberSongsPerArtist[a].length - numberSongsPerArtist[b].length;
  });
  sortedArr = sortedArr.reverse(); 
  res.status(200).json({ status: 200,  data : numberSongsPerArtist[sortedArr[0]] });  
};

const handleArtists = (req, res) => { 
  const artistSet = new Set();
  top50.forEach((song) => (artistSet.add(song.artist)));
  res.status(200).json({ status: 200,  data: [...artistSet] });
};

module.exports = { handleTop50Request, handleRankSongRequest, handleArtistSongsRequest, handleMostPopularArtist, handleArtists };
