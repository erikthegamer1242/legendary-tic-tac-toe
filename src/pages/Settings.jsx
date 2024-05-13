import React from 'react';
import { IonRadio, IonRadioGroup } from '@ionic/react';
import './Settings.css';

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
    var elem = document.getElementById('bg');
    elem.classList.add("dark");
    elem.classList.remove("light");
}

function lght()
{
    console.log("Stavi light theme");
    var elem = document.getElementById('bg');
    elem.classList.add("light");
    elem.classList.remove("dark");
}

function Example() {
    return (
        <div>
      <IonRadioGroup allowEmptySelection={false} value="single" class='radio-group'>
        <div>Choose the number of players:</div>
        <br/>
        <div className='singleplayer'>
            <IonRadio aria-label="Success" color="success" value="single">Single player</IonRadio>
        <br/>

        </div>
        <div className='multiplayer'>
            <IonRadio value="multi">Multi player</IonRadio>
        <br/>
        </div>
        <br/>
      </IonRadioGroup>

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
    );
  }

export default class Settings extends React.Component
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
                <Example/>
            </div>
        );
    }
}