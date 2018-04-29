require('normalize.css/normalize.css');
require('./RestorePassForm.scss');

import React from 'react';
import { firebaseApp } from '../firebase';

class RestorePassForm extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      restoreEmail:''
    }
  }

  restorePass(){
    //console.log('sfasf');
   // console.log(this.state.restoreEmail)
    firebaseApp.auth().sendPasswordResetEmail(this.state.restoreEmail).then(function () {
      // Email sent.
    }).catch(function (error) {
      // An error happened.
      //console.log(error)
    });
  }

  render() {
    return (
      <div>
        <h1>Zaloguj się</h1>
        <form action="">
          <input type="email" name="email" placeholder="email"
            onChange={event => { this.setState({ restoreEmail: event.target.value }); /* console.log(this.state.restoreEmail) */}} />
          <button type='button' id="login-button" onClick={() => this.restorePass()} >Wyślij</button>
        </form>
        <h5 className="login-link" onClick={this.props.login}>Zaloguj się <i className="fa fa-arrow-right" aria-hidden="true"></i></h5>
      </div>
    );
  }
}

RestorePassForm.defaultProps = {};

export default RestorePassForm;
