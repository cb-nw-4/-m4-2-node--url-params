import React from 'react';
import styled from 'styled-components';
import SongListItem from './SongListItem';


const SongList = ({allSongs}) =>{
    console.log(allSongs)


    return (
        <>
            <ul>
                {allSongs.map(song =>{
                    
                    return(
                        <li key={song.rank}>
                            <SongListItem  song={song}/>
                        </li>
                    )
            }
                
                
                )}
            </ul>
    
        </>
    )
}

export default SongList;