import React from "react";
import styled from "styled-components";
import SongListItem from "./SongListItem"

const SongList=({songs})=>{
    console.log(songs);
    return (
        <>
            <ul>
                {songs.map(song => {
                    return <SongListItem song={song}></SongListItem>
                })}
            </ul>
        </>
    );
}

export default SongList;