import React from "react";
import SongListItem from "./SongListItem";

const SongList = ({songs}) => {
    return(
        <ul>
            {songs.map((song) => {
                return <SongListItem rank={song.rank} song={song}></SongListItem>
            })}
        </ul>
    );
};

export default SongList;


