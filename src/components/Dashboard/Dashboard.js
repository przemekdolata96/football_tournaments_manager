require('normalize.css/normalize.css');
require('./Dashboard.scss');
import React from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase';
class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      open: false ,
      focused: false,
    };

  }
  handleToggle = () => this.setState({ open: !this.state.open });

  handleFocus = () => this.setState({ focused:!this.state.focused});

  signOut(){
    firebaseApp.auth().signOut()
    location.href="/";
  }
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <div className="mdl-layout__drawer mdl-color--light-green-500 mdl-color-text--red-50">
          <div className={this.state.focused ? ' mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label is-focused' : 'mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label'}>
            <label className="mdl-button mdl-color-text--red-50 mdl-js-button mdl-button--icon"
              for="fixed-header-drawer-exp">
                <i className="material-icons" onClick={this.handleFocus} >search</i>
            </label>
            <div className="mdl-textfield__expandable-holder">
              <input className="mdl-textfield__input" type="text" name="sample"
                id="fixed-header-drawer-exp"/>
            </div>
          </div>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link mdl-color-text--red-50" href=""><i className="material-icons" role="presentation">edit</i>Utwórz turniej</a>
            <a className="mdl-navigation__link mdl-color-text--red-50" href=""><i className="material-icons" role="presentation">build</i>Zarządzaj</a>
            <a className="mdl-navigation__link mdl-color-text--red-50" href=""><i className="material-icons" role="presentation">description</i>Przeglądaj</a>
            <div className="drawer_footer">
              <div className="mdl-navigation__link mdl-color-text--red-50" onClick={this.signOut}><i className="material-icons" role="presentation">error_outline</i>Wyloguj</div>
            </div>
          </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className = "page-content mdl-color--grey-50">
          
          </div>
        </main>
      </div>
    );
    
  }
}

Dashboard.defaultProps = {
};

export default Dashboard;

