import React from "react";
import SongListItem from "./SongListItem";

const SongList = (props)=> {
    console.log(props.songs,"here Songlist");
    return (
        <ul>
            {props.songs.map((element)=>{ 
                return (<SongListItem key={element.rank} song={element}></SongListItem>);
            })}
        </ul>
    ); 
}; 

export default SongList;