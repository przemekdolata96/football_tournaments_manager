require('normalize.css/normalize.css');
require('./Login.scss');

import React from 'react';

let image='../../images/football-1274661_1920.jpg';

class AppComponent extends React.Component {
    render() {
        return (
        <div className = "login" >
          <div className="image-side">
            <div className="title">
            <h1>Zapanuj</h1>
            <h1>Nad</h1>
            <h1>Własnyn</h1>
            <h1>Turniejem</h1>
            </div>
            <img src={image}/>
          </div>
          <div className="login-side">
              <h1>Zaloguj się</h1>
            <form action="">
              <input type="email" name="email"/>
              <input type="password" name="password"/>
              <button id="login-button" >Zaloguj się</button>
              <button id="facebook-button" >Zaloguj się przez Facebook</button>
            </form>
              <h5 className="restore-pass-link">Zapomniałeś hasła?</h5>
              <h5 className="create-account-link">Stwórz konto <i className="fas fa-arrow-right"></i></h5>
          </div>
         </div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
