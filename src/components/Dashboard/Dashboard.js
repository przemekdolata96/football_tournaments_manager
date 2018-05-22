require('normalize.css/normalize.css');
require('./Dashboard.scss');
import React from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp, database } from '../firebase';
import CreateTournament from '../CreateTournament/CreateTournament';
import ExploreTournaments from '../ExploreTournaments/ExploreTournaments';
import ManageTournaments from '../ManageTournaments/ManageTournaments';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      open: false ,
      focused: false,
      userName: "",
      content: 'create'
    };

    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          userName: user.displayName
        })
      } else {
        firebaseApp.auth().signOut()
      }
    });

  }
  handleToggle = () => this.setState({ open: !this.state.open });

  handleFocus = () => this.setState({ focused:!this.state.focused});

  signOut(){
    firebaseApp.auth().signOut()
    location.href="/";
  }

  getData(){
    console.log("GET DATA");
    console.log(firebaseApp.auth().currentUser);
    /* const tournamentsRef = database.ref('teams');
    tournamentsRef.on('value',function name(snapshot) {
      console.log(snapshot);
      
    }) */

    //database.ref().child('tournaments').child('1').child('matches').on("child_added", snap => {
     // console.log(snap)
     // console.log(snap.val())
     // console.log(firebaseApp.auth().currentUser.uid)
     /*  var $p = document.createElement("p");
      $p.innerHTML = snap.key + " - " + snap.val()
      userDetailUI.append($p); */

      /* database.ref('/tournaments/1/teams').push(
        {
          name: 'Zefka',
          players: {
            new:{
              name: 'Przemek Dolata',
              matches: 3,
              goals: 1
            }
          }
        }
      ) */

   // });

    //let matchesRef= database.ref()

    /* database.ref('/tournaments').push(
      {
        uid: firebaseApp.auth().currentUser.uid,
        name: 'My Tournament',
        matches: {

        },
        teams: {
          
        }
      }
    ) */

    /* database.ref('/tournaments/-LCOIDBuxgrE-xHgTFeY/matches').push({
        "guest": "Real Madrid",
        "guestScore": 2,
        "host": "Milan",
        "hostScore": 2
    }) */

    

  }
  

  render() {
    let view = this.state.content;
    let content;
      

    switch (view) {
      case 'create':
        content = <CreateTournament></CreateTournament>
        break;
      case 'manage':
          content=<ManageTournaments></ManageTournaments>
        break;
      case 'explore':
          content=<ExploreTournaments></ExploreTournaments>
        break;
      default:
        content = <CreateTournament></CreateTournament>
        break;
    }

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#8BC34A'
        },
        secondary: {
          main: '#9E9E9E'
        },
      },
    });


    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <div className="mdl-layout__drawer mdl-color--light-green-500 mdl-color-text--red-50">
          <nav className="mdl-navigation">
            <span className="user mdl-color-text--red-50"><i className="material-icons" role="presentation">person</i>{this.state.userName}</span>
            <div className="mdl-navigation__link mdl-color-text--red-50" onClick={()=>{this.setState({ content : 'create'})}}><i className="material-icons" role="presentation">edit</i>Utwórz turniej</div>
            <div className="mdl-navigation__link mdl-color-text--red-50" onClick={()=>{this.setState({ content: 'manage' })}}><i className="material-icons" role="presentation">build</i>Zarządzaj</div>
            <div className="mdl-navigation__link mdl-color-text--red-50" onClick={()=>{this.setState({ content: 'explore' })}}><i className="material-icons" role="presentation">description</i>Przeglądaj</div>
            <div className="drawer_footer">
              <div className="mdl-navigation__link mdl-color-text--red-50" onClick={this.signOut}><i className="material-icons" role="presentation">error_outline</i>Wyloguj</div>
            </div>
          </nav>
        </div>
        <MuiThemeProvider theme={theme}>
          <main className="mdl-layout__content mdl-color--grey-100">
            <div className = "page-content mdl-color--grey-50">
              {content}
            </div>
          </main>
        </MuiThemeProvider>
      </div>
    );
    
  }
}

Dashboard.defaultProps = {
};

export default Dashboard;

