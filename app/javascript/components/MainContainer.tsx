import React from 'react';
import NavBar from "./NavBar"
import {BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom"
import { SignUpForm } from './authforms/SignUpForm';
import BlogCreator from './BlogCreator';
import {getIsUserLoggedIn} from '../redux/selectors';
import { connect } from 'react-redux';
import FeedContainer from './feeds/FeedContainer';
import BlogView from './BlogView';

const mapStateToProps = store => ({
    isLoggedIn: getIsUserLoggedIn(store)
  })
  interface MainContainerlProps {
    isLoggedIn: boolean
  }
  const MainContainer: React.FC<MainContainerlProps> = (props) => {
    return (
      <Router>
        <NavBar>
          { props.isLoggedIn ?
            <NavLink to={'/create'} className={"navbar-item"} activeClassName={"is-active"}>
              Create
            </NavLink>
            : 
            <></>
          }
        </NavBar>
  
        <Switch>
          <Route exact path={'/'}> {/* This is the main feed */}
            <FeedContainer/>
          </Route>
          <Route path={'/register'} component={SignUpForm}/>
          <Route path={'/blog/view/:id'} children={<BlogView/>}/>
          { props.isLoggedIn ? 
            <Route path={'/create'}>
              <BlogCreator/>
            </Route>
            : 
            <></>
          }
        </Switch>
      </Router>
    );
  }

  export default connect(mapStateToProps)(MainContainer);