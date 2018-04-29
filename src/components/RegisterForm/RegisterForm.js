require('normalize.css/normalize.css');
require('./RegisterForm.scss');

import React from 'react';
import { firebaseApp } from '../firebase';
class RegisterForm extends React.Component {
  constructor(props){
    super(props)

    this.state={
      message:'',
      email:'',
      password:'',
      passwordConfirm:'',
      fname:'',
      lname:''
    }
  }

  signUp(){

    const email=this.state.email;
    const password=this.state.password;

    if (this.state.email == '' || this.state.password == ''
     || this.state.passwordConfirm == '' || this.state.fname == '' || this.state.lname==''){
      this.setState({
        message: 'Proszę wypełnić wszystkie pola'
      });
    } else if (this.state.password != this.state.passwordConfirm){
      this.setState({
        message: 'Hasła nie są identyczne'
      });
    }
    else {
      firebaseApp.auth().createUserAndRetrieveDataWithEmailAndPassword(
        email,password).catch((error) => {
          this.setState({message:error.message});
        })
    }
  }


  render() {
    return (
      <div>
        <h1>Zaloguj się</h1>
        <form action="">
          <label id="register-message-label"><span>&#x2063;</span>{this.state.message}</label>
          <input type="email" name="email" placeholder='email'
          onChange={event => this.setState({email: event.target.value})} />
          <input type="password" name="password" placeholder='hasło'
            onChange={event => this.setState({ password: event.target.value })}/>
          <input type="password" name="password-confirm" placeholder='powtórz hasło'
            onChange={event => this.setState({ passwordConfirm: event.target.value })}/>
          <input type="text" name="fname" placeholder='imię'
            onChange={event => this.setState({ fname: event.target.value })}/>
          <input type="text" name="lname" placeholder='nazwisko'
            onChange={event => this.setState({ lname: event.target.value })}/>
          <button type='button' id="login-button" onClick={()=>this.signUp()} >Zarejestruj się</button>
        </form>
        <h5 className="login-link" onClick={this.props.login}>Zaloguj się <i className="fa fa-arrow-right" aria-hidden="true"></i></h5>
      </div>
    );
  }
}

RegisterForm.defaultProps = {};

export default RegisterForm;
