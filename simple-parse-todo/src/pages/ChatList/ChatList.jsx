import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonFooter,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonButton,
  IonIcon,
  IonAvatar,
  IonLabel,
  IonItem,
  IonListHeader,
  IonSegment,
  IonSegmentButton,
  IonTextarea
} from "@ionic/react";

import PageHeader from '../../common/PageHeader/PageHeader';

import './ChatList.scss';

import { Toggler } from '../../common/Toggler';

const ChatList = () => {
  const [section, setSection] = useState('chats');

  let chats = [];

  for (let index = 0; index < 5; index++) {
    chats.push({
      avatar: 'https://i.pravatar.cc/64',
      username: `User ${index}`,
      message: `Hello from user ${index}`
    });
  }

  return (
    <IonPage className="ChatList">
      <IonHeader translucent>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/tab2" />
          </IonButtons> */}
          <IonTitle>Chat List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PageHeader title="This is a test" subtitle="Create on May 9 at 20:20 PM" image="https://loremflickr.com/640/360"/>

        <div className="ion-padding">
          <IonSegment onIonChange={e => setSection(e.detail.value)}>
            <IonSegmentButton value="chats" checked={section === 'chats'}>
              <IonLabel>Chats</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="details" checked={section === 'details'}>
              <IonLabel>Details</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        
        {section === 'chats' && (
          <div className="chats-section">
            <IonListHeader>Recent messages</IonListHeader>
            <IonList>
              {chats.map(chat => (
                <IonItem>
                  <IonAvatar slot="start">
                    <img src={chat.avatar}/>
                  </IonAvatar>
                  <IonLabel>
                    <h3>{chat.username}</h3>
                    <p>{chat.message}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        )}

        {section === 'details' && (
          <div className="details-section">
            {/* Category */}
            <IonListHeader>Category</IonListHeader>
            <p className="toggler-Container">
              <Toggler name="Plumbering"/>
            </p>

            {/* Description */}
            <IonListHeader>Description</IonListHeader>

            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, tempor arcu mauris sed odio justo, volutpat blandit risus cubilia curabitur rhoncus. Metus praesent dictum tempus, accumsan orci vulputate eros, neque cras.</p>

            <div className="ion-padding">
              <IonButton expand="block" fill="outline" color="danger">Delete</IonButton>
            </div>
          </div>
        )}
        
      </IonContent>
    </IonPage>
  );
};

export default ChatList;
