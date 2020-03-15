import React from 'react';
import 'bulma';
import '../resources/App.css';
import {NavBar} from "./NavBar"
import LoginForm from './authforms/LoginForm'

const App: React.FC = () => {
  return (
      <React.Fragment>
        <NavBar>
          <a className={"navbar-item"}>
            Create
          </a>
        </NavBar>
        <LoginForm/>
      </React.Fragment>)
};

export default App;
