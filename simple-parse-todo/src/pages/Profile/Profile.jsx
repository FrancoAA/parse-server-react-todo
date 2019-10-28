import React, { useState } from "react";

import {
  IonPage,
  IonContent,
  IonLabel,
  IonSegment,
  IonSegmentButton
} from "@ionic/react";

import Rating from "../../common/Rating/Rating";
import { randomInt } from "../../common/utils";
import ReviewsList from './components/ReviewList/ReviewsList';
import About from './components/About/About';
import Photos from './components/Photos/Photos';

import "./Profile.scss";

const ProfilePage = () => {
  const [section, setSection] = useState("photos");

  let reviews = [];
  for (let index = 0; index < 5; index++) {
    reviews.push({
      id: index,
      rating: 3.5,
      avatar: 'https://i.pravatar.cc/64',
      username: `User ${index}`,
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur felis leo, tristique vitae erat eget, rutrum volutpat neque. Suspendisse cras amet.`,
      date: new Date()
    });
  }

  let photos = [];
  for (let index = 0; index < 13; index++) {
    photos.push({
      id: index,
      thumbnail: `https://loremflickr.com/${randomInt(100, 64)}/${randomInt(100, 64)}`,
      full_size: 'https://loremflickr.com/640/360'
    });
  }

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
          <IonSegmentButton mode="md" value="about" checked={section === "about"}>
            <IonLabel>About</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton mode="md" value="photos" checked={section === "photos"}>
            <IonLabel>Photos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton mode="md" value="reviews" checked={section === "reviews"}>
            <IonLabel>Reviews</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {section === 'about' && (
          <About/>
        )}

        {section === 'photos' && (
          <Photos photos={photos}/>
        )}

        {section === 'reviews' && (
          <ReviewsList reviews={reviews}/>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
