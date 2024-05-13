import React from 'react';
import { IonRadio, IonRadioGroup, IonText } from '@ionic/react';
import './Menu.css';
import { IonToolbar, IonButtons, IonButton, IonTitle } from '@ionic/react';


function Example() {
    return (
        
        <IonToolbar>
             <IonText color="black">
        <h1 className='Title'>Choose the number of players:</h1>
        </IonText>
            <IonButton className='button' size="large" onClick={() => window.open('/game',"_self")}>SinglePlayer</IonButton>
            <br></br>
            <IonButton className='button' size="large" onClick={() => window.open('/tab2', '_self')}>Multiplayer</IonButton>
        </IonToolbar>
    );
}
export default class Menu extends React.Component
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
            <div className="center">
                <Example />
            </div>
        );
    }
}