import React from "react";
import styled from "styled-components";
import SongListItem from "./SongListItem";

const SongList = ({ songs }) => {
  return (
    <Wrapper>
      <SongListItem
        songs={songs.map((song) => (
          <List>
            <Wrapper2>
              <Wrapper3>#{song.rank}</Wrapper3>
              <Wrapper4>({song.streams} streams)</Wrapper4>
            </Wrapper2>
            <Wrapper7>
              <Wrapper5>{song.title}</Wrapper5>
              <Wrapper6> by {song.artist}</Wrapper6>
            </Wrapper7>
            <Wrapper8>publication date:{song.publicationDate}</Wrapper8>
          </List>
        ))}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  list-style-type: none;
`;
const List = styled.ul`
  background-color: #f6f7fc;
  border-radius: 4px;
  box-shadow: 0 60px 120px rgba(71, 69, 123, 0.24),
    0 15px 35px rgba(71, 69, 123, 0.24);
  width: 100vw;
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
`;
const Wrapper2 = styled.div`
  flex-direction: column;
  width: 20vw;
`;
const Wrapper3 = styled.div`
  font-size: 40px;
  align-self: flex-end;
`;
const Wrapper4 = styled.div`
  align-self: flex-end;
`;
const Wrapper5 = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
const Wrapper6 = styled.div``;
const Wrapper7 = styled.div`
  flex-direction: column;
  width: 60vw;
`;
const Wrapper8 = styled.div`
  font-size: 13px;
  font-weight: 100;
`;

export default SongList;
