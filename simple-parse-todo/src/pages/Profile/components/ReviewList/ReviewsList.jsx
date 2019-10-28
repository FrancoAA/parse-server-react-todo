import React from 'react';

import {
  IonAvatar,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/react";

import Rating from '../../../../common/Rating/Rating';

import './ReviewsList.scss';


const ReviewsList = ({ reviews }) => {
  return (
    <IonList className="ReviewsList">
    {reviews.map(review => (
      <IonItem key={review.id} lines="full">
        <IonAvatar slot="start">
          <img src={review.avatar} alt="avatar"/>
        </IonAvatar>
        <IonLabel className="ion-text-wrap">
          <div className="stars-container">
            <Rating rating={review.rating}/>
            <span className="date">{review.date}</span>
          </div>
          <p>{review.text}</p>
        </IonLabel>
      </IonItem>
    ))}
    </IonList>
  )
};

export default ReviewsList;