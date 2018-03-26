require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import {Router, Route , Link} from 'react-router-dom';
import Login from './Login/Login';
import { createBrowserHistory} from 'history';
import { firebaseApp } from './firebase.js';
import Dashboard from './Dashboard/Dashboard';

const history=createBrowserHistory();

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props){
    super(props)

    firebaseApp.auth().onAuthStateChanged(user => {
      if(user){
        history.push('/dashboard');
        console.log('zalogowany ',user);
      } else {
        console.log('niezalogowany ');
      }
    });
  }

  render() {
    return (
      <Router history={history}>
        <div>
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        </div>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
