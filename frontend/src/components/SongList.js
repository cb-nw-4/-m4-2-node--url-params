import React from "react";
import SongListItem from "./SongListItem";

const SongList = ({ songs }) => {
  console.log(`songs`, songs);
  return (
    <>
      {songs.map((song,i) => (
        <SongListItem key={i} song={song}></SongListItem>
      ))}
    </>
  );
};

export default SongList;
