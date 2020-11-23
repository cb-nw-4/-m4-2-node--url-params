import React, { useEffect, useState } from "react";
import styled from "styled-components";


const SongListItem = (props) => {
    return (
        props.songs.map((song) => {
            return <SongInfo>
                <Rank>#{song.rank}</Rank>
                <Streams>({song.streams} streams)</Streams>
                <SongTitle>{song.title}</SongTitle>
                <Artist>by {song.artist}</Artist>
                <Publication>publication date: {song.publicationDate}</Publication>
                </SongInfo>
        })
        )
};

const SongInfo = styled.div`
border-top: solid 1px black;
display: flex;
margin: 20px;
padding-top: 15px;

&:first-of-type {
    border-top: none;
  }
`;

const Rank = styled.li`
list-style-type: none;
width: 75px;
font-size: 3em;
font-weight: bold;
`;

const Streams = styled.li`
list-style-type: none;
position: absolute;
margin-top: 60px;
font-size: 0.70em;
`;

const SongTitle = styled.li`
list-style-type: none;
margin-left: 50px;
font-size: 1.25em;
font-weight: bold;
`;

const Artist = styled.li`
list-style-type: none;
position: absolute;
margin-top: 25px;
margin-left: 125px;
font-style: italic;
`;

const Publication = styled.li`
list-style-type: none;
position: absolute;
margin-top: 55px;
right: 44px;
font-size: 0.85em;
`;

export default SongListItem;
