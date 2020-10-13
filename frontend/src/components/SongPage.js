import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const SongPage = () => {
  const { songRank } = useParams();
  const [song, setSong] = useState({});

  useEffect(() => {
    fetch(`/top50/song/${songRank}`)
      .then((res) => res.json())
      .then((json) => {
        setSong(json.data);
      });
  }, []);

  return (
    <>
      <Header pageTitle={`Song #${song.rank}`} />
      <SongContainer>
        <Title>{song.title}</Title>
        <Artist>{song.artist}</Artist>
        <StreamCount>{song.streams}</StreamCount>
      </SongContainer>
    </>
  );
};

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 3px 4px 23px 0px #ccc;
  height: 400px;
  margin: 48px auto;
  padding: 24px;
  width: 400px;
`;
const Title = styled.h1`
  border-bottom: 1px solid #ccc;
  font-size: 24px;
  margin-bottom: 8px;
  padding-bottom: 16px;
  text-align: center;
`;
const Artist = styled.p`
  text-align: center;
`;
const StreamCount = styled.p`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 180px;
  font-weight: 700;
  color: #ccc;
`;

export default SongPage;
