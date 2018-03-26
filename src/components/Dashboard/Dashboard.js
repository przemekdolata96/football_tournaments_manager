require('normalize.css/normalize.css');
require('normalize.css/normalize.css');
require('./Dashboard.scss');

import React from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase';

class Dashboard extends React.Component {
  constructor(props){
    super(props)
  }

  signOut(){
    firebaseApp.auth().signOut()
  }
  render() {
    return (
      <div>
        <Link to={'/login'} onClick={() => this.signOut()}>Wyloguj się</Link>
      </div>
    );
  }
}

Dashboard.defaultProps = {
};

export default Dashboard;
