import React from 'react';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

import './Rating.scss';

const Rating = ({ rating }) => {
  let stars = [];
  let remainder = rating % 1;
  let wholeStars = rating - remainder;
  let count = 5;

  while (count > 0) {
    stars.push(
      <IonIcon key={count} icon={
        wholeStars > 0 
        ? star 
        : remainder && wholeStars > -1
        ? starHalf
        : starOutline }>
      </IonIcon>
    );
    count--;
    wholeStars--
  }

  return (
    <div className='Rating'>{stars}</div>
  );
};

export default Rating;