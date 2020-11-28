import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Top50 from "./Top50";
import SongPage from "./SongPage";
import PopularArtistPage from "./PopularArtistPage";
import ArtistPage from "./ArtistPage";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/music">
            <Top50 />
          </Route>
          <Route exact path="/music/:songRank">
            <SongPage />
          </Route>
          <Route exact path="/music/artist/:artistName">
            <ArtistPage />
          </Route>
          <Route exact path="/most-popular-artist">
            <PopularArtistPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
