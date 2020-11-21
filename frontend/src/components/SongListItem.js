import React from 'react'; 
import styled from 'styled-components'; 

const SongListItem = (props)=> {
    console.log(props.song,"Here");
    let song = props.song;
    return (
        <Row>
            <RankDiv>
                <h1>#{song.rank}</h1>
                <span>({song.streams} streams)</span>
            </RankDiv>
            <TitleDiv>
                <h2>{song.title}</h2>
                <h3><i>by {song.artist}</i></h3>
            </TitleDiv>
            <PublDiv> 
                <p>publication date: {song.publicationDate}</p>
            </PublDiv>
        </Row>
    );
}; 

const Row = styled.li`
display: flex;
align-items:center;
border-bottom: 1px solid gray;
padding:10px;
width:100%;
`
const RankDiv = styled.div`
margin: 5px;
padding:5px;
flex:1;
& h1 { 
    padding:10px 0px;
    font-size:45px;
};
& span { 
    font-size:12px;
    color:gray;
}
`

const TitleDiv = styled.div`
flex:6;
& h2 {
    font-size:24px;
    margin: 5px;
};
& h3 { 
    font-weight:normal;
    font-size:20px;
    margin: 5px;
};
`

const PublDiv = styled.div`
flex:2;
display:flex;
margin:5px;
justify-content:flex-end;
align-self:flex-end;
`

export default SongListItem; 