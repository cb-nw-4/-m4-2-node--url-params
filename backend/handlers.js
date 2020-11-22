const top50 = require("./data/top50.js");

const wildCardHandler = (req, res) => {
  console.log(res);
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
};

const top50Handler = (req, res) => {
  res.status(200).json({ status: 200, data: top50.top50 });
};

const songRankHandler = (req, res) => {
  let data = top50.top50.filter(
    (song) => song.rank === Number(req.params.rank)
  );
  if (data.length === 0)
    res
      .status(404)
      .json({ status: 404, message: "There is no song by that Rank." });
  else res.status(200).json({ status: 200, data });
};

const songArtistHandler = (req, res) => {
  let data = top50.top50.filter((song) =>
    song.artist.toLowerCase().includes(req.params.artist.toLowerCase())
  );
  if (data.length === 0)
    res
      .status(404)
      .json({ status: 404, message: "There is no song by that Artist." });
  else res.status(200).json({ status: 200, data });
};

const popularArtistHandler = (req, res) => {
  let popularSongs = [];
  top50.top50.forEach((songEntry, i) => {
    popularSongs[i] = top50.top50.filter((song) =>
      song.artist.toLowerCase().includes(songEntry.artist.toLowerCase())
    );
  });
  let index = popularSongs.reduce((acc, arr, i) => {
    return arr.length > popularSongs[acc].length ? i : acc;
  }, 0);
  let data = popularSongs[index];
  res.status(200).json({ status: 200, data });
};

const artistHandler = (req, res) => {
  let duplicateArtists = top50.top50.map((song) => song.artist);
  let uniqueArtists = new Set(duplicateArtists);
  let data = [...uniqueArtists];
  res.status(200).json({ status: 200, data });
};

module.exports = {
  top50Handler,
  wildCardHandler,
  artistHandler,
  popularArtistHandler,
  songArtistHandler,
  songRankHandler,
};
