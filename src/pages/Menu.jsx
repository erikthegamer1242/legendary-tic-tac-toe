import React from 'react';
import { IonRadio, IonRadioGroup, IonText } from '@ionic/react';
import './Menu.css';
import { IonToolbar, IonButtons, IonButton, IonTitle } from '@ionic/react';


function handleClick(a)
{
    if(a==1)
    {
        lght();
    }
    else
    {
        dark();
    }
}

function dark()
{
    console.log("Stavi dark theme");
    var elem = document.getElementById("bg");
    elem.classList.add("dark");
    elem.classList.remove("light");
}

function lght()
{
    console.log("Stavi light theme");
    var elem = document.getElementById("bg");
    elem.classList.add("light");
    elem.classList.remove("dark");
}


function Example() {
    return (
        
        <IonToolbar >
            <div itemID='bg'>
             <IonText color="black">
        <h1 className='Title'>Choose the number of players:</h1>
        </IonText>
            <IonButton className='button' size="large" onClick={() => window.open('/game',"_self")}>SinglePlayer</IonButton>
            <br></br>
            <IonButton className='button' size="large" onClick={() => window.open('/tab2', '_self')}>Multiplayer</IonButton>
            <br></br>
            <IonRadioGroup allowEmptySelection={false} value="white" class='radio-group'>
        <div>Set theme background:</div>
        <br/>
        <div className='white'>
            <IonRadio aria-label="whitebg" onClick={() => handleClick(1)} color="light" value="white">light</IonRadio>
        <br/>

        </div>
        <div className='black'>
            <IonRadio aria-label="blackbg" onClick={() => handleClick(2)} color="dark" value="black">dark</IonRadio>
        <br/>
        </div>
        <br/>
        
      </IonRadioGroup>
      </div>
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
            <div className="center" id="bg">
                <Example />
            </div>
        );
    }
}
