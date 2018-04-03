require('normalize.css/normalize.css');
require('./Login.scss');

import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import RestorePassForm from '../RestorePassForm/RestorePassForm';


let image='../../images/football-1274661_1920.jpg';

class Login extends React.Component {
    constructor(props){
      super(props)

      this.state={
        form:'login'
      }
    }
    registerFormHandler(){
      this.setState({
        form:'register'
      });
    }
    loginFormHandler() {
      this.setState({
        form: 'login'
      });
    }

    restoreFormHandler() {
      this.setState({
        form: 'restore'
      });
    }

    render() {
        const form=this.state.form;
        const formView=null;
        if(form=='login'){
          this.formView = <LoginForm register={() => this.registerFormHandler()} restore={() => this.restoreFormHandler()}></LoginForm>;
        } else if (form == 'register'){
          this.formView = <RegisterForm login={() => this.loginFormHandler()}></RegisterForm>;
        }else {
          this.formView = <RestorePassForm login={() => this.loginFormHandler()}></RestorePassForm>;
        }
        return (
          <div className="login" >
            <div className="image-side">
              <div className="title">
                <h1>Zapanuj</h1>
                <h1>Nad</h1>
                <h1>Własnym</h1>
                <h1>Turniejem</h1>
              </div>
              <img src={image} />
            </div>
            <div className="login-side">
              {this.formView}
            </div>
          </div>
        );
    }
}

Login.defaultProps = {};

export default Login;
