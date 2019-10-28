import React from 'react';
import { IonGrid, IonRow, IonCol, IonContent, IonThumbnail } from '@ionic/react';

import './Photos.scss';

const Photos = ({ photos }) => {
  let grid = [];
  let colCount = 0;
  let photosCopy = [...photos];
  let photosPerColumn = (photosCopy.length / 3);
  let remainder = photosPerColumn % 3;
  
  while(photosCopy.length > 0) {
    const row = photosCopy.splice(0, remainder ? photosPerColumn + remainder : photosPerColumn).map(photo => (
      <img key={photo.id} src={photo.thumbnail} alt="thumbnail"/>
    ));
    remainder = 0;
    colCount++;
    grid.push(<div className="column" key={colCount}>{row}</div>);
  }

  return (
    <div className="Photos">
      <div className="row">
        {grid}
      </div>
    </div>
  );
};

export default Photos;