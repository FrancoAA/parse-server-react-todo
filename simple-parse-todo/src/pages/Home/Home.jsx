import React from 'react';

import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton
} from '@ionic/react';

const HomePage = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Todo</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            News title
          </IonCardTitle>
          <IonCardSubtitle>
            News subtitle
          </IonCardSubtitle>

        </IonCardHeader>
        <IonCardContent>
          <IonButton >Read</IonButton>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonApp>
);

export default HomePage;