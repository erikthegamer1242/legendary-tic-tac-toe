import React from 'react';
import SettingsForm from '../components/SettingsForm.jsx';
import Game from '../components/Game.jsx';
import './index.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default class GamePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            boardSize: 3,
            clock: false,
            time: 10,
            matchID: 0
        };

        this.newGame = this.newGame.bind(this);
    }

    newGame(size, clock, time)
    {
        // console.log('New size is ' + size);
        this.setState((prevState, props) => ({
            boardSize: size,
            clock: clock,
            time: time,
            matchID: prevState.matchID+1
        }));
    }

    Game = () => {
    {
        return (
            <div className="app">
                <SettingsForm defaultValues={this.state} submitCallback={this.newGame} /><br/>
                <Game key={this.state.matchID}
                    size={this.state.boardSize}
                    clock={this.state.clock}
                    time={this.state.time}
                    renderInfo={true} />
            </div>
            );
        }
    }
}