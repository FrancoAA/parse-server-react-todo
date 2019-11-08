import React from "react";

import {
  IonPage,
  IonContent,
  IonListHeader,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonSearchbar,
  IonButton,
  IonIcon
} from "@ionic/react";

import { arrowForward } from "ionicons/icons";

import "./Explore.scss";

const ExplorePage = () => {
  const mostPopular = [];
  for (let i = 0; i < 10; i++) {
    mostPopular.push({
      name: `Category ${i}`,
      image: "https://placeimg.com/150/100/tech"
    });
  }

  return (
    <IonPage className="Explore">
      <IonContent>
        <IonSearchbar />

        <IonListHeader>
          Most popular
          <IonButton className="see-all" fill="clear">
            See All <IonIcon icon={arrowForward} />
          </IonButton>
        </IonListHeader>
        <div className="horizontal-scroller">
          {mostPopular.map((item, index) => (
            <IonCard key={index}>
              <img src={item.image} />
              <IonCardHeader>
                <IonCardSubtitle>Hello</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </div>

        <IonListHeader>Recommended for you</IonListHeader>
        <div className="horizontal-scroller">
          {mostPopular.map((item, index) => (
            <IonCard key={index}>
              <img src={item.image} />
              <IonCardHeader>
                <IonCardSubtitle>Hello</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ExplorePage;
