import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import GamePage from './GamePage';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='game-title'>Tic-Tac-Toe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <GamePage />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
