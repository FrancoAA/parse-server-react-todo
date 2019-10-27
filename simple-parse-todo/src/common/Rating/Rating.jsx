import React from 'react';
import { star as starIcon } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Rating = ({ rating }) => {
  let stars = [];
  for (let index=1;index < rating; index++) {
    stars.push(1);
  }

  console.log(stars);

  return (
    <p className='Rating'>{stars.map((star, key) => (<IonIcon key={key} icon={starIcon}></IonIcon>))}</p>
  );
};

export default Rating;