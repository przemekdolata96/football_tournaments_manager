require('normalize.css/normalize.css');
require('./RestorePassForm.scss');

import React from 'react';

class RestorePassForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1>Zaloguj się</h1>
        <form action="">
          <input type="email" name="email" placeholder="email" />
          <button type='button' id="login-button" >Wyślij</button>
        </form>
        <h5 className="login-link" onClick={this.props.login}>Zaloguj się <i className="fas fa-arrow-right"></i></h5>
      </div>
    );
  }
}

RestorePassForm.defaultProps = {};

export default RestorePassForm;
