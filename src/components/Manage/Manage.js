require('normalize.css/normalize.css');
require('./Manage.scss');
import React from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp, database } from '../firebase';
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/Button/Button";
import Card from "material-ui/Card/Card";
import Snackbar from 'material-ui/Snackbar/Snackbar';
import IconButton from 'material-ui/IconButton/IconButton';
import Icon from 'material-ui/Icon/Icon';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar/AppBar';
import Paper from 'material-ui/Paper/Paper';
import {Tabs,Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography/Typography'
import Input from 'material-ui/Input/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormHelperText from 'material-ui/Form/FormHelperText';
import FormControl from 'material-ui/Form/FormControl';
import Select from 'material-ui/Select/Select';
import MenuItem from 'material-ui/Menu/MenuItem';

//import {  } from "../../../node_modules/material-ui/";

class Manage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab:'teams',
            disabled: true,
            dirty: false,
            open: false,
            message: 'Turniej został dodany to listy twoich turnieji',
            teamName:'',
            teams: [],
            teamsCards: [],
            selectTeam:'',
            playerName:'',
            disabledPlayer: true,
            dirtyPlayer: false,
            openPlayer: false,
        };
        

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePlayerInputChange = this.handlePlayerInputChange.bind(this);
        this.createTeam= this.createTeam.bind(this);
        this.createPlayer= this.createPlayer.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value.slice(0, 49);
        const name = target.id;

        this.setState({
            [name]: value,
            dirty: true
        });

        if (value.length >= 3) {
            this.setState({
                disabled: false
            })
        } else {
            this.setState({
                disabled: true
            })
        }
    }

    handlePlayerInputChange(event) {
        const target = event.target;
        const value = target.value.slice(0, 49);
        const name = target.id;

        this.setState({
            [name]: value,
            dirtyPlayer: true
        });

        if (value.length >= 5) {
            this.setState({
                disabledPlayer: false
            })
        } else {
            this.setState({
                disabledPlayer: true
            })
        }
    }

    createTeam() {
        database.ref(`/tournaments/${this.props.tournamentID}/teams`).push(
            {
                name: this.state.teamName,
            }
        ).then(() => {
            this.setState({
                open: true,
                message: 'Drużyna została dodana do turnieju!',
                teamName: '',
                dirty: false
            });
        }).catch(() => {
            this.setState({
                open: true,
                message: 'Coś poszło nie tak!'
            });
        })

        this.setState({
            disabled: true,
            dirty: false
        });
    }

    createPlayer() {
        database.ref(`/tournaments/${this.props.tournamentID}/teams/${this.state.selectTeam}/players`).push(
            {
                name: this.state.playerName,
                matches: 0,
                goals: 0,
            }
        ).then(() => {
            this.setState({
                openPlayer: true,
                message: 'Zawodnik został dodany do turnieju!',
                playerName: '',
                dirtyPlayer: false
            });
        }).catch(() => {
            this.setState({
                openPlayer: true,
                message: 'Coś poszło nie tak!'
            });
        })

        this.setState({
            disabledPlayer: true,
            dirtyPlayer: false
        });
    }

    handleClose() {
        this.setState({
            open: false,
            openPlayer: false,
        });
    }

    componentDidMount() {
        this.getTeams()
    }

    getTeams() {
        database.ref(`/tournaments/${this.props.tournamentID}/teams`).on('value', (snapshot) => {

            console.log(snapshot)
            const teams = [];
            

            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                teams.push(item);
            });
            console.log(teams)

            const teamCards = teams.map(element => {
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
                teamsCards: teamCards,
                teams: teams,
                selectTeam:teams[0].key,
            })

        })
    }

    handleSelectChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const selectItems = this.state.teams.map((team) =>
            <MenuItem value={team.key}>{team.name}</MenuItem>
        );
       
        return (
            <div className="manage-container">
                <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div className="mdl-tabs__tab-bar">
                        <a className={"mdl-tabs__tab " + (this.state.activeTab === 'teams' ? 'is-active' : '')} onClick={() => { this.setState({ activeTab: 'teams' }) }}>Drużyny</a>
                        <a className={"mdl-tabs__tab " + (this.state.activeTab === 'players' ? 'is-active' : '')} onClick={() => { this.setState({ activeTab: 'players' }) }}>Zawodnicy</a>
                        <a className={"mdl-tabs__tab " + (this.state.activeTab === 'matches' ? 'is-active' : '')} onClick={() => { this.setState({ activeTab: 'matches' }) }}>Mecze</a>
                    </div>
                </div>
                {this.state.activeTab==='teams' && (
                <div>
                    <div className="mdl-grid team-form">
                        <div className="width-40">
                            <TextField helperText={this.state.dirty && this.state.disabled ? 'Nazwa powinna zawierać conajmniej 3 znaki' : undefined}
                                error={this.state.dirty && this.state.disabled} id="teamName" fullWidth value={this.state.teamName}
                                onChange={this.handleInputChange} label="Nazwa drużyny">
                            </TextField>
                        </div>
                        <div className="width-20">
                            <Button variant="raised" disabled={this.state.disabled} color="primary" onClick={this.createTeam}>Dodaj</Button>
                        </div>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.message}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <Icon>close</Icon>
                            </IconButton>,
                        ]}
                    />
                    <div className="mdl-cell mdl-cell--12-col">
                        <div className="flexbox">
                            {this.state.teamsCards}
                        </div>
                    </div>
                </div>
                )}

                {this.state.activeTab === 'players' && (
                    <div>
                        <FormControl >
                            <InputLabel htmlFor="selectTeam-simple">Age</InputLabel>
                            <Select
                                value={this.state.selectTeam}
                                onChange={this.handleSelectChange}
                                inputProps={{
                                    name: 'selectTeam',
                                    id: 'selectTeam-simple',
                                }}
                            >
                                {selectItems}
                            </Select>
                        </FormControl>

                        <TextField helperText={this.state.dirtyPlayer && this.state.disabledPlayer ? 'Imie i nazwisko powinno mieć conajmniej 5 znaków' : undefined}
                            error={this.state.dirtyPlayer && this.state.disabledPlayer} id="playerName" fullWidth value={this.state.playerName}
                            onChange={this.handlePlayerInputChange} label="Imie i nazwisko zawodnika">
                        </TextField>
                        <Button variant="raised" disabled={this.state.disabledPlayer} color="primary" onClick={this.createPlayer}>Dodaj zawodnika</Button>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={this.state.openPlayer}
                            autoHideDuration={6000}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.message}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                >
                                    <Icon>close</Icon>
                                </IconButton>,
                            ]}
                        />
                    </div>
                )}
                {this.state.activeTab === 'matches' && (
                    <div>mecze</div>
                )}
            </div>
        );
    }
}

Manage.defaultProps = {
};

export default Manage;

