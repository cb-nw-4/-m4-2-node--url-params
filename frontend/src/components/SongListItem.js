import React from "react";
import styled from "styled-components";


const SongListItem = (({song})=>{
    return(
        <List>
            <div>
                <Rank>{`#${song.rank}`}</Rank>
                <Stream>{`(${song.streams} streams)`}</Stream>             
            </div>
            <MiddleWrapper>
                <Title><strong>{song.title}</strong></Title>
                <p><i>{`by ${song.artist}`}</i></p>                 
            </MiddleWrapper>
            <Date>{`publication date: ${song.publicationDate}`} </Date> 
        </List>
    );
});

const Date = styled.p`
   align-self: flex-end;
   font-size: 14px;   
`;

const List = styled.li`
    display: flex;
    justify-content: space-between;    
    padding: 15px 0;
    border-bottom: solid 1px grey;  
`;

const MiddleWrapper = styled.div`
    flex: 1;
    padding: 5px 35px;
`;

const Rank = styled.p`  
   font-size: 46px;   
`;

const Stream = styled.p`  
   font-size: 12px;   
`;

const Title = styled.p`  
   font-size: 19px;   
`;

export default SongListItem;