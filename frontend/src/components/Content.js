import React from "react";
import styled from "styled-components";
import SongListItem from "./SongListItem";

const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  padding: 0 24px 24px;
`;

export default Content;
