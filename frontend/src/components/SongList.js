import React from 'react';
import SongListItems from './SongListItems';


const SongList = ({songs}) => {

return ( 

    <ul><SongListItems songs={songs}/></ul>
)
}
export default SongList;