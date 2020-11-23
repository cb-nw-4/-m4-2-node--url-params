import React, { useEffect, useState } from "react";
import SongListItem from "./SongListItem";
import styled from "styled-components";

const songList = (props) => {
    return <SongList>
        <SongListItem songs={props.songs} />
        </SongList>
}

const SongList = styled.ul`
list-style-type: none;
`;

export default songList;
