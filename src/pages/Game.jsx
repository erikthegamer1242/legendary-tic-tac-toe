import React from 'react';
import SettingsForm from '../components/SettingsForm.jsx';
import Game from '../components/Game.jsx';
import './index.css';

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

    render()
    {
        return (
            <div className="app">
                <SettingsForm defaultValues={this.state} submitCallback={this.newGame} /><br/>
                <Game key={this.state.matchID}
                    size={3}
                    clock={this.state.clock}
                    time={this.state.time}
                    renderInfo={true} />
            </div>
        );
    }
}