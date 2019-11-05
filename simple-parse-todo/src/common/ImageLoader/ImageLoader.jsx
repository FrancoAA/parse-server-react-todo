import React, { useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { image } from 'ionicons/icons';

import './ImageLoader.scss';

const ImageLoader = ({ src, height, width, ...extra }) => {
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const onLoadHandler = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="ImageLoader" style={{ height, width }}>
      {loading && (<div className="placeholder"><IonIcon icon={image}/></div>)}
      <img src={src} onLoad={onLoadHandler} style={{ visibility: loading ? 'hidden' : 'visible' }} {...extra}/>
    </div>
  )
};

export default ImageLoader;