import React from "react";
import SongListItem from "./SongListItem";

const SongList = ({ songs }) => {
    return (
        <ul>{songs.map((song) => {
                return (
                    <SongListItem key={song.rank} song={song} />
                );
            })}
        </ul>
    )
}

export default SongList;