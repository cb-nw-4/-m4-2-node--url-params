import React from "react";
import SongListItem from "./SongListItem"

const SongList = ({allSongs}) =>{

    return (
    <ul>
    {allSongs.map((song) =>{
        return <SongListItem song = {song}/>;
    })}
    </ul>
    );

};

export default SongList;