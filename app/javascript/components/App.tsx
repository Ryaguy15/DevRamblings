import React from 'react';
import 'bulma';
import '../resources/App.css';
import {Provider} from 'react-redux';
import store from '../redux/store'
import NavBar from "./NavBar"
import SignUpForm from "./authforms/SignUpForm";

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <NavBar>
          <a className={"navbar-item"}>
            Create
          </a>
        </NavBar>
        <SignUpForm />
      </Provider>)
};

export default App;
