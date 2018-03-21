require('normalize.css/normalize.css');
require('./LoginForm.scss');

import React from 'react';

class LoginForm extends React.Component {
  constructor(props){
    super(props)
  }

    render() {
        return (
          <div>
              <h1>Zaloguj się</h1>
              <form action="">
              <input type="email" name="email"/>
              <input type="password" name="password"/>
              <button type='button' id="login-button" >Zaloguj się</button>
              <button type='button' id="facebook-button" >Zaloguj się przez Facebook</button>
              </form>
            <h5 className="restore-pass-link" onClick={this.props.restore}>Zapomniałeś hasła?</h5>
              <h5 className="create-account-link" onClick={this.props.register}>Stwórz konto <i className="fas fa-arrow-right"></i></h5>
          </div>
        );
    }
}

LoginForm.defaultProps = {};

export default LoginForm;
