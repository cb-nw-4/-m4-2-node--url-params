import React from "react";
import styled from "styled-components";

const SongStyle = styled.li`
  display: flex;
  align-items: flex-start;
  list-style: none;
  padding: 10px;
`;

const BigNumberDiv = styled.div`
  font-size: 40px;
  display: flex;

  flex-direction: column;
  align-items: center;
`;

const Streams = styled.p`
  font-weight: normal;
`;

const SongTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
  width: 500px;
`;

const BigNumber = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

const SongTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

const SongAuthor = styled.p`
  font-style: italic;
`;

const SongPubDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 300px;
  height: 90px;
`;

const SongListItem = ({ song }) => {
  return (
    <>
      <SongStyle>
        <BigNumberDiv>
          <BigNumber>#{song.rank}</BigNumber>
          <Streams>({song.streams}) Streams</Streams>
        </BigNumberDiv>
        <SongTitleDiv>
          <SongTitle>{song.title}</SongTitle>
          <SongAuthor>{song.artist}</SongAuthor>
        </SongTitleDiv>
        <SongPubDate>
          <p>publication Date: {song.publicationDate}</p>
        </SongPubDate>
      </SongStyle>
    </>
  );
};

export default SongListItem;
