import React from 'react';
import { IonRadio, IonRadioGroup } from '@ionic/react';
import './Settings.css';
import { IonToolbar, IonButtons, IonButton, IonTitle, IonText } from '@ionic/react';

import { useTranslation } from "react-i18next";
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

// function Example() {
//     return (
//         <div>
//       <IonRadioGroup allowEmptySelection={false} value="single" class='radio-group'>
//         <div>Choose the number of players:</div>
//         <br/>
//         <div className='singleplayer'>
//             <IonRadio aria-label="Success" color="success" value="single">Single player</IonRadio>
//         <br/>

//         </div>
//         <div className='multiplayer'>
//             <IonRadio value="multi">Multi player</IonRadio>
//         <br/>
//         </div>
//         <br/>
//       </IonRadioGroup>

//       <IonRadioGroup allowEmptySelection={false} value="white" class='radio-group'>
//         <div>Set theme background:</div>
//         <br/>
//         <div className='white'>
//             <IonRadio aria-label="whitebg" onClick={() => handleClick(1)} color="light" value="white">light</IonRadio>
//         <br/>

//         </div>
//         <div className='black'>
//             <IonRadio aria-label="blackbg" onClick={() => handleClick(2)} color="dark" value="black">dark</IonRadio>
//         <br/>
//         </div>
//         <br/>
        
//       </IonRadioGroup>
//       </div>
//     );
//   }
// stari settings ekran

function Example() {
    const Test = () => {
        const[t, i18n]= useTranslation("global");
    
        const handleChangeLanguage = (lang) => {
            i18n.changeLanguage(lang);
            console.log("Promijenio jezik na: " + lang);
        }
        
        return (
            
            <IonToolbar class="toolbar">
                <div itemID='bg'>
                    <IonText color="black">
                        <h1 className='Title'>{t("Player_Number")}</h1>
                    </IonText>
                    <IonButton className='button' color="primary" size="large" onClick={() => window.open('/game',"_self")}>{t("Singleplayer")}</IonButton>
                    <br></br>
                    <IonButton className='button' color="primary" size="large" onClick={() => window.open('/tab2', '_self')}>{t("Multiplayer")}</IonButton>
                    <br></br>
                    <IonRadioGroup allowEmptySelection={false} value="white" class='radio-group'>
                        <div className='Title'>{t("Background")}</div>
                        <br/>
                        <div className='white'>
                            <IonRadio aria-label="whitebg" onClick={() => handleClick(1)} color="light" value="white">{t("Light")}</IonRadio>
                            <br/>
                        </div>
                        <div className='black'>
                            <IonRadio aria-label="blackbg" onClick={() => handleClick(2)} color="dark" value="black">{t("Dark")}</IonRadio>
                            <br/>
                        </div>
                    </IonRadioGroup>
                    <div className='Title'>{t("Language")}</div>
                        <br/>
                        <IonButton aria-label="eng" color="primary" onClick={() => handleChangeLanguage("en")}>{t("English")}</IonButton>
                        <br/>
                        <IonButton aria-label="hr" color="primary" onClick={() => handleChangeLanguage("hr")}>{t("Croatian")}</IonButton>
                        <br/>
                </div>
            </IonToolbar>
        );
    }

    return (
        <div className="center" id="bg">
            <Test />
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