import React from 'react';
import SettingsForm from '../components/SettingsForm.jsx';
import Game from '../components/Game.jsx';
import './gamePage.css';

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
                <SettingsForm defaultValues={this.state} submitCallback={this.newGame} /><br/>
                <Game key={this.state.matchID}
                    size={3}
                    renderInfo={true} />
            </div>
        );
    }
}
