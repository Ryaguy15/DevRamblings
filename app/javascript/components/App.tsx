import React from 'react';
import 'bulma';
import '../resources/App.css';
import {NavBar} from "./NavBar"
import FeedContainer from "./feeds/FeedContainer"


const App: React.FC = () => {
  return (
      <React.Fragment>
        <NavBar>
          <a className={"navbar-item"}>
            Create
          </a>
        </NavBar>
        <FeedContainer/>
      </React.Fragment>)
};

export default App;
