import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Content from "./Content";

const HomePage = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch(`/top50/artist`)
      .then((res) => res.json())
      .then((json) => {
        setArtists(json.data);
      });
  }, []);

  return (
    <>
      <Header pageTitle="Music Homepage" />
      <Content>
        <h2 style={{ marginTop: "24px" }}>Popular Links</h2>
        <Menu>
          <li>
            <StyledLink to="/music">All Songs</StyledLink>
          </li>
          <li>
            <StyledLink to="/most-popular-artist">Songs by most popular artist</StyledLink>
          </li>
        </Menu>
        <h2>Artists on this list</h2>
        <Menu>
          {artists.map((artist) => (
            <li>
              <StyledLink to={`/music/artist/${artist}`}>{artist}</StyledLink>
            </li>
          ))}
        </Menu>
      </Content>
    </>
  );
};

const Menu = styled.ul`
  border: 1px solid #808080;
  margin: 24px 0;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;

  li {
    flex: 1 0 50%;
  }
`;

const StyledLink = styled(Link)`
text-decoration:none; 
color:black;
&:hover { 
  color: rgb(30,215,96);
  font-weight:bold;
}
`

export default HomePage;
