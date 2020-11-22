import React from "react";
import styled from "styled-components";

export const SongListItem = ({ song }) => {
  console.log(song);
  const createSongLi = song;
  return (
    <Li>
      <Ranking>
        <Span>{`#${song.rank}`}</Span>
        {`(${song.streams} streams)`}
      </Ranking>
      <Song>
        <Span>{song.title}</Span>
        {song.artist}
      </Song>
      <Div>{`publication date: ${song.publicationDate}`}</Div>
    </Li>
  );
};

const Div = styled.div`
  align-self: flex-end;
`;

const Song = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
`;

const Span = styled.span`
  font-size: 2rem;
  font-weight: bolder;
`;

const Li = styled.li`
  padding-top: 2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px black solid;
  display: flex;
  justify-content: space-around;
`;

const Ranking = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
