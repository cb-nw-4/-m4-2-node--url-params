import React from "react";
import { SongListItem } from './SongListItem'

export const SongList = ({songs}) => {
  
  return(
    <ul>
      {songs.map(song => {
        return <SongListItem song={song}></SongListItem>
      })}
    </ul>
  )
}

