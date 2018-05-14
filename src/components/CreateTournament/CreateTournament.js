require('normalize.css/normalize.css');
require('./CreateTournament.scss');
import React from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp, database } from '../firebase';
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/Button/Button";
import Card from "material-ui/Card/Card";
import Snackbar from 'material-ui/Snackbar/Snackbar';
import IconButton from 'material-ui/IconButton/IconButton';
import Icon from 'material-ui/Icon/Icon';
class CreateTournament extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: "",
            tournamentName: '',
            disabled: true,
            dirty: false,
            open: false,
            message: 'Turniej został dodany to listy twoich turnieji'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createTournament = this.createTournament.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

     handleInputChange(event) {
       const target = event.target;
       const value = target.value.slice(0,49);
       const name = target.id;
       
       this.setState({
         [name]: value,
         dirty: true
       });

       if(value.length>=3){
            this.setState({
                disabled: false
            })
       } else {
           this.setState({
                disabled: true
            })
       }
     }

     createTournament() {
        database.ref('/tournaments').push(
          {
            uid: firebaseApp.auth().currentUser.uid,
            name: this.state.tournamentName,
            matches: {
    
            },
            teams: {
              
            }
          }
        ).then(()=>{
            this.setState({
                open: true,
                message: 'Turniej został dodany to listy twoich turnieji!'
            });
        }).catch(()=>{
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

     handleClose(){
        this.setState({
         open: false,
       });
     }

    render() {
        return (
            <div className="tournament-form">
                <Card>
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--12-col">
                            <div className="min-height">
                                <TextField helperText={this.state.dirty && this.state.disabled ? 'Nazwa powinna zawierać conajmniej 3 znaki' : undefined} 
                                    error={this.state.dirty && this.state.disabled} id="tournamentName" fullWidth value={this.state.tournamentName }  
                                    onChange={this.handleInputChange} label="Nazwa turnieju">
                                </TextField>
                            </div>
                        </div>
                        <div className="mdl-cell mdl-cell--12-col">
                            <Button variant="raised" disabled={this.state.disabled} color="primary" onClick={this.createTournament}>Dodaj</Button>
                        </div>
                    </div>
                </Card>
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
            </div>
        );

    }
}

CreateTournament.defaultProps = {
};

export default CreateTournament;

