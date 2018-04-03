require('normalize.css/normalize.css');
require('./LoginForm.scss');

import React from 'react';
import { firebaseApp,provider} from '../firebase';

class LoginForm extends React.Component {
  constructor(props){
    super(props)

    this.state={
      isLogin:false,
      message:'',
      email:'',
      password:''
    }
  }

  signIn(){
    const email = this.state.email;
    const password = this.state.password;

    if(this.state.email =='' || this.state.password =='') {
      this.setState({message:'Podaj poprawne dane!'});
    } else {
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then((result)=>{
        console.log(result);
      })
        .catch((error) => this.setState({ message:error.message }));
    }
  }

  signInFacebook(){
    firebaseApp.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }


    render() {
        const message = this.state.message;
        return (
          <div>
            <h1>Zaloguj się</h1>
            <form action="">
              <label id="register-message-label"><span>&#x2063;</span>{message}</label>
              <input type="email" name="email" placeholder="email"
                onChange={event => this.setState({ email: event.target.value })} />
              <input type="password" name="password" placeholder="hasło"
                onChange={event => this.setState({ password: event.target.value })} />
              <button type='button' id="login-button" onClick={() => this.signIn()} >Zaloguj się</button>
              <button type='button' id="facebook-button" onClick={() => this.signInFacebook()}>Zaloguj się przez Facebook</button>
            </form>
            <h5 className="restore-pass-link" onClick={this.props.restore}>Zapomniałeś hasła?</h5>
            <h5 className="create-account-link" onClick={this.props.register}>Stwórz konto <i className="fas fa-arrow-right"></i></h5>
          </div>
        );
    }
}
LoginForm.defaultProps = {};

export default LoginForm;
