import React from 'react';
import { IonRadio, IonRadioGroup, IonText } from '@ionic/react';
import './Menu.css';
import { IonToolbar, IonButtons, IonButton, IonTitle } from '@ionic/react';

import { useTranslation } from "react-i18next";


function Example() {
    const Test = () => {
        const[t, i18n]= useTranslation("global");
    
        const handleChangeLanguage = (lang) => {
            i18n.changeLanguage(lang);
            console.log("Promijenio jezik na: " + lang);
        }
        
        return (
            
            <IonToolbar class="toolbar">
                <div id='bg'>
                    <IonText color="black">
                        <h1 className='Title'>{t("Player_Number")}</h1>
                    </IonText>
                    <IonButton  className='button' color="primary" size="large" onClick={() => window.open('/game',"_self")}>{t("Singleplayer")}</IonButton>
                    <br></br>
                    <IonButton className='button' color="primary" size="large" onClick={() => window.open('/gameMulti', '_self')}>{t("Multiplayer")}</IonButton>
                    <br></br>
                    <br></br>
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