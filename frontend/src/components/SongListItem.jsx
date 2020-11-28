import React from "react";

const SongListItem = ({ songs }) => {
  return (
    <span>
      {songs.map((song) => (
        <li>{song}</li>
      ))}
    </span>
  );
};

export default SongListItem;
