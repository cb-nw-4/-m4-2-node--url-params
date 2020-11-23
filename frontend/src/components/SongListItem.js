import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';


const SongListItem = (({song})=>{
    return(
        < StyledLink to={`/music/${song.rank}`} >
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
        </StyledLink>
    );
});

const StyledLink = styled(Link)`
  text-decoration: none;  
  color: inherit;
`;

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