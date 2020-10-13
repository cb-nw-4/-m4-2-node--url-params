import React from "react";
import styled from "styled-components";

const Content = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled.div`
  padding: 0 24px 24px;
`;

export default Content;
