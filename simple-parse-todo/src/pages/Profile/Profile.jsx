import React, { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton
} from "@ionic/react";

import Rating from "../../common/Rating/Rating";

import "./Profile.scss";

const ProfilePage = () => {
  const [section, setSection] = useState("chats");

  return (
    <IonPage className="Profile">
      <IonContent>
        <div className="Container">
          {/* <PageHeader title="John Doe" subtitle="Joined on 9th July" image="https://loremflickr.com/640/360"/> */}
          <div className="Profile-picture">
            <img src="https://loremflickr.com/640/360" />
          </div>

          <div className="Profile-userinfo">
            <p>Franco Alarcon</p>
            <small>Member since: 4th July</small>
            <Rating rating={3.5}/>
          </div>
        </div>

        <IonSegment mode="md" onIonChange={e => setSection(e.detail.value)}>
          <IonSegmentButton mode="md" value="chats" checked={section === "chats"}>
            <IonLabel>Jobs</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton mode="md" value="details" checked={section === "details"}>
            <IonLabel>Reviews</IonLabel>
          </IonSegmentButton>
        </IonSegment>

      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
