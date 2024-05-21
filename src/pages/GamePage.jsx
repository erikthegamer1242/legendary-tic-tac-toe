import React from 'react';
import SettingsForm from '../components/SettingsForm.jsx';
import Game from '../components/Game.jsx';
import './gamePage.css';
import { clearBoard } from '../util/db.jsx';
import { IonButton, IonText } from '@ionic/react';
import Board from './../components/Board';
export default class GamePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            matchID: 0
        };
        this.newGame = this.newGame.bind(this);
    }

    newGame(size)
    {
        //clearBoard();
        this.setState((prevState) => ({
            boardSize: size,
            matchID: prevState.matchID+1
        }));
    }

    detectHeight() {
        console.log(document.getElementById("gameIonPage").offsetHeight)
    }

    render()
    {
        return (
            <div className="app stretch-to-bottom">
                <Game match={this.state.matchID}
                    size={3}
                    renderInfo={true} /> 
                <IonButton className='button' onClick={() =>this.newGame(3)} color="primary" size="default">Clear</IonButton>
                <br/>
            </div>
        );
    }
}
