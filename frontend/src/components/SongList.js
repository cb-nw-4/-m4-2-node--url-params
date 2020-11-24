import React from 'react';
import SongListItem from './SongListItem';

const SongList = (props) => {
  return (
    <>
      <ul>
        {props.songs.forEach(song => {
          return (
            <SongListItem />
        );})}
      </ul>
    </>
  )
}

export default SongList;
