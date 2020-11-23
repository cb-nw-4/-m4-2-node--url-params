import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid #808080;
    padding-bottom: 10px;
`;

const Ranking = styled.div`
    display: flex;
    flex-direction: column;
`;

const Rank = styled.span`
    font-size: 40px;
`;

const NumOfStreams = styled.span`
    color: #808080;
    font-size: 15px;
`;

const Song = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left: 80px;
    top: -10px;
`;

const Title = styled.span`
    font-weight: bold;
    font-size: 20px;
`;

const Artist = styled.span`
    color: #808080;
    font-size: 20px;
`;

const Pub = styled.div`
    position: absolute;
    right: 20px;
`;

const PublicationDate = styled.span`
    position: relative;
    top: 60px;
    color: #808080;
    font-size: 15px;
`;

const SongListItem = ({ song }) => {
    return ( 
        <Container>   
            <Ranking>
                <Rank>{`#${song.rank}`}</Rank>
                <NumOfStreams>{`(${song.streams} streams)`}</NumOfStreams>
            </Ranking>
            <Song>
                <Title>{song.title}</Title>
                <Artist><i>{`by ${song.artist}`}</i></Artist>
            </Song>
            <Pub>
            <PublicationDate>{`publication date: ${song.publicationDate}`}</PublicationDate>
            </Pub>
        </Container>
    );
}

export default SongListItem;