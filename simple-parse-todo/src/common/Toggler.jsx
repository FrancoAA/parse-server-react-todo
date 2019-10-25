import React, { useState } from 'react';
import { IonLabel, IonChip } from '@ionic/react';

export const Toggler = ({ name }) => {
  const [selected, setSelected] = useState(true);
  const toggleSelected = () => {
    setSelected(prev => !prev);
  };
  return (<IonChip color="primary" outline={selected} onClick={toggleSelected}>
    <IonLabel>{name}</IonLabel>
  </IonChip>);
};
