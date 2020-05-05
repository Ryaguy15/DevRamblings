import React from 'react';
import 'bulma';
import '../resources/App.css';
import {NavBar} from "./NavBar"
import SignUpForm from "./authforms/SignUpForm";

const App: React.FC = () => {
  return (
      <React.Fragment>
        <NavBar>
          <a className={"navbar-item"}>
            Create
          </a>
        </NavBar>
        <SignUpForm />
      </React.Fragment>)
};

export default App;
