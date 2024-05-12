import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';

import GamePage from './GamePage';

const Tab1: React.FC = () => {
  return (
    <IonPage id="gameIonPage">
      <IonHeader>
        <IonToolbar>
          <IonTitle className='game-title'>Tic-Tac-Toe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding stretch-to-bottom">
          <GamePage />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
