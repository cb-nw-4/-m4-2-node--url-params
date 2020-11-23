import React from "react";
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
    margin: 20px 0;
`;



export default SongList;