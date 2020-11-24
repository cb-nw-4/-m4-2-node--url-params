import React from 'react';
import styled from "styled-components";

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 15% 50% 35%;
  height: 75px;
  margin: 10px;
  border-bottom: 1px solid black;
`;

const Cell1 = styled.div`
  position: relative;
  top: 15px;
  height: 60px;
`;

const Cell2 = styled.div``;

const Cell3 = styled.div`
  text-align: right;
  font-size: 0.8rem;
  position: relative;
  top: 40px;
  height: 20px;
`;

const Rank = styled.h1``;

const Streams = styled.span`
  font-size: 0.8rem;
`;

const Title = styled.span`
  font-size: 1.2rem;
`;

const Artist = styled.span`
  font-style: italic;
`;

const SongListItem = (props) => {
  return (
    <ListItem>
      <Cell1>
        <Rank>#{props.rank}</Rank>
        <Streams>({props.streams} streams)</Streams>
      </Cell1>
      <Cell2>
        <Title>{props.title}<br/></Title>
        <Artist>by {props.artist}</Artist>
      </Cell2>
      <Cell3>
        publication date: {props.publicationDate}
      </Cell3>
    </ListItem>
  );
}

export default SongListItem;
