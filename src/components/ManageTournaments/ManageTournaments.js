require('normalize.css/normalize.css');
require('./ManageTournaments.scss');
import React from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp, database } from '../firebase';
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/Button/Button";
import Card from "material-ui/Card/Card";
import Snackbar from 'material-ui/Snackbar/Snackbar';
import IconButton from 'material-ui/IconButton/IconButton';
import Icon from 'material-ui/Icon/Icon';
import Manage from "../Manage/Manage";
class ManageTournaments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tournaments: [],
            manage:null,
            contentType:'tournaments',
            disabled: true,
            dirty: false,
            open: false,
            message: 'Turniej został dodany to listy twoich turnieji'
        };

        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.getsTournaments()
    }

    getsTournaments() {
        database.ref('/tournaments').on('value', (snapshot) => {

            const tournaments = [];

            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                tournaments.push(item);
            });
            console.log(tournaments)

            const tournamentCards = tournaments.map(element => {
                if (firebaseApp.auth().currentUser.uid === element.uid){
                    return (
                        <div className="demo-card-image mdl-card mdl-shadow--2dp" onClick={()=>{
                            this.setState({
                                manage: <Manage tournamentID={element.key}></Manage>,
                                contentType:'manage',
                            })
                        }}>
                            <div className="mdl-card__title mdl-card--expand"></div>
                            <div className="mdl-card__actions">
                                <span className="demo-card-image__filename">{element.name}</span>
                            </div>
                        </div>
                    )
                }
            });

            this.setState({
                tournaments: tournamentCards
            })

        })
    }

    render() {
        let content;
        switch (this.state.contentType) {
            case 'tournaments':
                    content=this.state.tournaments
                break;
            case 'manage':
                    content=this.state.manage
                break;
            default:
                    content = this.state.tournaments
                break;
        }
        return (
            <div className="tournament-form" id="explore">
                <div className="explore-container">
                    {content}
                </div>
            </div>
        );
    }
}

ManageTournaments.defaultProps = {
};

export default ManageTournaments;

