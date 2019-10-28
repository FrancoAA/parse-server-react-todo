import React from 'react';

import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonText,
  IonListHeader
} from "@ionic/react";

import { format, formatDistanceToNow } from 'date-fns';

import './About.scss';

const About = () => (
  <>
    <IonList>
      <IonListHeader>Specialities</IonListHeader>
      <IonItem lines="none">Plomeria, Albañileria</IonItem>
      <IonListHeader>Jobs Completed</IonListHeader>
      <IonItem lines="none">100</IonItem>
      <IonListHeader>Last Activity</IonListHeader>
      <IonItem lines="none">{formatDistanceToNow(new Date(), { addSuffix: true })}</IonItem>
    </IonList>
  </>
);

export default About;