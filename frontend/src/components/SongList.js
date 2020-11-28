import React, { useEffect, useState } from "react";

const SongList = ({allSongs}) =>{

    console.log("song list: ",allSongs);
    return (
    <ul>
    {allSongs.forEach((song) =>{
        return <li>{song.title}</li>;
    })}
    </ul>
    );

};

export default SongList;