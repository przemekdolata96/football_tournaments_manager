require('normalize.css/normalize.css');
require('./ExploreTournaments.scss');
import React from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp, database } from '../firebase';
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/Button/Button";
import Card from "material-ui/Card/Card";
import Snackbar from 'material-ui/Snackbar/Snackbar';
import IconButton from 'material-ui/IconButton/IconButton';
import Icon from 'material-ui/Icon/Icon';
class ExploreTournaments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tournaments:[]
        };

        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        this.getsTournaments()
    }

    getsTournaments() {
        database.ref('/tournaments').on('value',(snapshot)=>{

            const tournaments = [];

            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                tournaments.push(item);
            });
            console.log(tournaments)

            const tournamentCards=tournaments.map(element => {
                return (
                    <div className="demo-card-image mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title mdl-card--expand"></div>
                        <div className="mdl-card__actions">
                            <span className="demo-card-image__filename">{element.name}</span>
                        </div>
                    </div>
                )
            });

            this.setState({
                tournaments:tournamentCards
            })
            
        })
    }

    render() {
        return (
            <div className="tournament-form" id="explore">
                <div className="explore-container">
                    {this.state.tournaments}
                </div>
            </div>
        );
    }
}

ExploreTournaments.defaultProps = {
};

export default ExploreTournaments;

