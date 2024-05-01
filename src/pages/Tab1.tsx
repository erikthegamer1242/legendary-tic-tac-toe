import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import Game from './Game';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tic-Tac-Toe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <Game />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
