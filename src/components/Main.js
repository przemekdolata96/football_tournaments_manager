require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';
import Login from './Login/Login';


let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Login} />
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
