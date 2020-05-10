import React from 'react';
import 'bulma';
import '../resources/App.css';
import {Provider} from 'react-redux';
import store from '../redux/store'
import NavBar from "./NavBar"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { SignUpForm } from './authforms/SignUpForm';


const App: React.FC = () => {
  return (
      <Provider store={store}>
        <Router>
          <NavBar>
            <a className={"navbar-item"}>
              Create
            </a>
          </NavBar>

          <Switch>
            <Route exact path={'/'}> {/* This is the main feed */}
              <h1>Hello World</h1>
            </Route>
            <Route path={'/register'} component={SignUpForm}/>
          </Switch>
        </Router>
      </Provider>)
};

export default App;
