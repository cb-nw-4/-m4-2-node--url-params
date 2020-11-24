import React from 'react';
import SongListItem from './SongListItem';

const SongList = (props) => {
  return (
    <>
      <ul>
        {props.songs.map(song => {
          return (
            <SongListItem
              rank={song.rank}
              title={song.title}
              artist={song.artist}
              streams={song.streams}
              publicationDate={song.publicationDate}
            />
        );})}
      </ul>
    </>
  )
}

export default SongList;
