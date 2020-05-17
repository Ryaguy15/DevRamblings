import React from 'react';
import 'bulma';
import '../resources/App.css';
import {Provider, connect} from 'react-redux';
import store from '../redux/store'
import MainContainer from './MainContainer'


const App: React.FC = () => {
  return (
      <Provider store={store}>
        <MainContainer/>
      </Provider>)
};

export default App;
