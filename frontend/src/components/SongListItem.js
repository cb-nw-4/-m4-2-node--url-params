import React from 'react';
import styled from 'styled-components';


const SongListItem = ({song}) =>{

    return (
        <DivContainer>
            <DivHeader>
                <h1>{`#${song.rank}`}</h1>
                <span>{`(${song.streams} streams)`}</span>
            </DivHeader>
            <Div>
                <h3>{song.title}</h3>
                <Title>{`by ${song.artist}`}</Title>
            </Div>
            <DivFooter>{`publication date: ${song.publicationDate}`}</DivFooter>            
        </DivContainer>
    )
}


const DivContainer = styled.div`
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid gray;
    margin: 10px 20px;

`
const Div= styled.div`
    align-self: flex-start;
    flex-grow: 3;
    margin : 20px 30px;

`
const DivHeader = styled.div`
    align-self: center;

    & h1{
        margin-bottom: 10px;
    }
    & span{
        color: gray;
    }
`

const Title = styled.h6`
    font-size: 24px;
    font-style: italic;
    font-weight: lighter;
   
    margin: 10px 0;
`
const DivFooter = styled.div`
    align-self: flex-end;
    color: gray;
    margin-bottom: 10px;
`



export default SongListItem;