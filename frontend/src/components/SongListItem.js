import React from "react";
import styled from "styled-components"; 

const Container = styled.div` 
    display: flex;
    margin-top: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #606060;
`

const Rank = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const RankText = styled.h1` 
    font-size: 50px;
    font-weight: 400;
`

const SongStreams = styled.h5`
    font-size: 13px;
    font-weight: 300;
    color: #303030;
`

const Song = styled.div` 
    display: flex;
    flex-direction: column;
    margin-left: 5%;
`

const SongTitle = styled.p`
    font-size: 26px;
    font-weight: bold;
    justify-content: space-between;
`

const SongArtist = styled.p`
    font-size: 26px;
    font-weight: 100;
    font-style: italic;
`
const PublicationContainer = styled.div` 
    position: absolute;
    right: 15px;
    width: 200px;
`

const PublicationDate = styled.p` 
    text-align: right;
    font-size: 14px;
    color: #606060;
    position: absolute; 
    top: 60px;
    right: 15px;
`

const SongListItem = ({song}) => {
    return(
        <Container>
            <Rank>
                <RankText>{`#${song.rank}`}</RankText>
                <SongStreams>{`(${song.streams} streams)`}</SongStreams>
            </Rank>
            <Song>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>{`by ${song.artist}`}</SongArtist>
            </Song>
            <PublicationContainer>
                <PublicationDate>{`publication date: ${song.publicationDate}`}</PublicationDate>
            </PublicationContainer>
        </Container>
    )
}

export default SongListItem;
