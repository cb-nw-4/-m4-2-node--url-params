import React from "react";
import styled from "styled-components";

const SongListItem = ({song}) =>{

    return (
<ListItem>
    <Columns>
        <Column1><Number>#{song.rank}</Number></Column1>
        <Column2>
            <SongTitle>{song.title}</SongTitle> 
            <Artist>by {song.artist}</Artist>
        </Column2>
    </Columns>
        <Line2>
            <LineContent>({song.streams} streams)</LineContent>
            <LineContent>publication date: {song.publicationDate}</LineContent>
        </Line2>
</ListItem>);

};

const ListItem = styled.li`
    border-bottom: 1px solid black;
    height:100px;
    padding-top:10px;    
`;
const Columns = styled.div`
    display:flex;
`;
const Column1 = styled.div`
    font-family: 'Roboto Slab', serif;

`;
const Column2 = styled.div`
    font-family: 'Roboto Slab', serif;

`;
const Line2 = styled.div`
    font-family: 'Roboto Slab', serif;
    display:flex;
    justify-content:space-between;

`;
const Number = styled.p`
    font-family: 'Roboto Slab', serif;
    font-size: 40px;
    margin:0;
    padding-bottom:0;
    width:100px;

`;
const SongTitle = styled.p`
    font-weight:600;
    font-size:18px;
`
const Artist = styled.p`
    font-style:italic;
`;

const LineContent = styled.p`
    font-size:12px;

`;

export default SongListItem;