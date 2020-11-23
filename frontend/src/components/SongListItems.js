import React, { useState, useEffect }  from "react";
import styled from "styled-components";

const SongListItems = ({ songs }) => {
  return (!!songs.length &&
    songs.map((song) => {
    return (
      <Wrapper>
        <Item key={song.rank}>
            <Ranking>
            <Rank>#{song.rank}</Rank>
            <Stream>({song.streams} streams)</Stream>
            </Ranking>
            <ArtistDiv>
            <Song>{song.title}</Song>
          <Artist>by {song.artist}</Artist>
          </ArtistDiv>
          <DateDiv>
          <Date>Publication Date : {song.publicationDate}</Date>
          </DateDiv>
        </Item>
      </Wrapper>
    );
  }))
};


const Wrapper = styled.div`
height:120px;
margin-top:50px;

border-bottom:1px solid black;



`;
const Ranking = styled.div`
padding:20px;

`;
const Item = styled.li`
display:flex;
`;


const Rank = styled.h1`
font-size:300%;
`;
const Stream = styled.p`
padding-top:20px;
color:#706868;
`;

const ArtistDiv = styled.div`
display:flex;
flex-direction:column;
margin-left:50px;
width:65vw;
`;
const Song = styled.h2`
text-decoration:underline;
text-decoration-thickness: 3px;
`;
const Artist = styled.h3`
padding-top:15px;
font-style: italic;
color:#706868;
`;
const DateDiv = styled.div`
margin-top:70px;
`;
const Date = styled.p`
`;
export default SongListItems;
