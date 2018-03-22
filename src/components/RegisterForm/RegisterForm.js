require('normalize.css/normalize.css');
require('./RegisterForm.scss');

import React from 'react';
import * as firebase from 'firebase';


var config = {
  apiKey: 'AIzaSyDNab6T2t5XKikNqVYZ6greXA6fenyJvLw',
  authDomain: 'react-fire-f018d.firebaseapp.com',
  databaseURL: 'https://react-fire-f018d.firebaseio.com',
  projectId: 'react-fire-f018d',
  storageBucket: 'react-fire-f018d.appspot.com',
  messagingSenderId: '355267734364'
};
firebase.initializeApp(config);


class RegisterForm extends React.Component {
  constructor(props){
    super(props)

    this.registerHandler=this.registerHandler.bind(this);
    this.setMessage=this.setMessage.bind(this);

    this.state={
      message:''
    }
  }

  registerHandler(){
    let email=document.getElementsByName('email')[0].value;
    let password=document.getElementsByName('password')[0].value;
    let passwordConfirm=document.getElementsByName('password-confirm')[0].value;
    let fname=document.getElementsByName('fname')[0].value;
    let lname=document.getElementsByName('lname')[0].value;
    let json={
      'email' : email,
      'password': password,
      'displayName': fname+' '+lname
    }

    function getError(message) {
      this.setMessage(message)
    }
    var getError= getError.bind(this)

    if (email == '' || password == '' || passwordConfirm == '' || fname == '' || lname==''){
      this.setMessage('Proszę wypełnić wszystkie pola')
    } else if (password != passwordConfirm){
      this.setMessage('Hasła nie są identyczne')
    }
    else {
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
        email, password).catch(function (error) {
          // Handle Errors here.
         // var errorCode = error.code;
          //var errorMessage = error.message;
          getError(error.message)
        })
    }
  }

    setMessage(paramMessage){
      this.setState({
        message:paramMessage
      });
    }


  render() {
    const message=this.state.message;

    return (
      <div>
        <h1>Zaloguj się</h1>
        <form action="">
          <label id="register-message-label"><span>&#x2063;</span>{message}</label>
          <input type="email" name="email" placeholder='email' />
          <input type="password" name="password" placeholder='hasło'/>
          <input type="password" name="password-confirm" placeholder='powtórz hasło' />
          <input type="text" name="fname" placeholder='imię'/>
          <input type="text" name="lname" placeholder='nazwisko'/>
          <button type='button' id="login-button" onClick={this.registerHandler} >Zarejestruj się</button>
        </form>
        <h5 className="login-link" onClick={this.props.login}>Zaloguj się <i className="fas fa-arrow-right"></i></h5>
      </div>
    );
  }
}

RegisterForm.defaultProps = {};

export default RegisterForm;
