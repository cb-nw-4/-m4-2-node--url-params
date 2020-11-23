import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SongListItem from "./SongListItem";

const SongList = ({songs})=> {
    return (
        <ListContainer>
            {songs.map((song)=>(
                <SongListItem key={song.rank} song={song}/>
            ))}   
        </ListContainer>
    );
};

const ListContainer = styled.ul`
    margin: 15px 0;
`;



export default SongList;