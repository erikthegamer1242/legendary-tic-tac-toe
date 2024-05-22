import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';

import GamePageMulti from './GamePageMulti';

const Tab3: React.FC = () => {
  return (
    <IonPage id="gameIonPage">
      <IonHeader>
        <IonToolbar>
          <IonTitle className='game-title'>Legendary Tic-Tac-Toe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding stretch-to-bottom">
          <GamePageMulti />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
