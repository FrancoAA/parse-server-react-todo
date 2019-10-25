import React from 'react';

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonIcon,
  IonListHeader,
  IonTextarea,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/react';

import { camera } from 'ionicons/icons';

import './Compose.scss';
import { Toggler } from '../../common/Toggler';

const ComposePage = () => {
  return (
    <IonPage className="Compose">

      <IonContent>
        <IonList>

          {/* Picture */}
          <IonListHeader>Select an Image</IonListHeader>
          <div className="Camera-container ion-padding">
            <div className="Camera-select-picture">
              <IonIcon icon={camera}></IonIcon>
            </div>
          </div>

          {/* Category */}
          <IonListHeader>Select one or more categories</IonListHeader>
          <p>
            <Toggler name="Plumbering"/>
            <Toggler name="Electricity"/>
            <Toggler name="Handyman"/>
            <Toggler name="Gardener"/>
          </p>

          {/* Description */}
          <IonListHeader>Give a description</IonListHeader>
          <IonItem>
            <IonTextarea placeholder="What do you need?"></IonTextarea>
          </IonItem>

          <div className="Spacing"></div>
        </IonList>
      </IonContent>

      <div className="Publish-Btn-Container">
        <IonButton expand="block" type="submit" class="ion-no-margin">Publish</IonButton>
      </div>
    </IonPage>
  );
};

export default ComposePage;