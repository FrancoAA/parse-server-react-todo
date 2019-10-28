import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

import { Plugins, CameraResultType } from '@capacitor/core';

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonIcon,
  IonListHeader,
  IonTextarea,
  IonButton,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonInput
} from '@ionic/react';

import { camera } from 'ionicons/icons';

import './Compose.scss';
import { Toggler } from '../../common/Toggler';

const ComposePage = () => {
  const [imgUri, setImageUri] = useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    async function getAddressFromGeolocation() {
      const { coords } = await Plugins.Geolocation.getCurrentPosition();
      const { data } = await axios.post(`https://nominatim.openstreetmap.org/search?q=${coords.latitude},${coords.longitude}&format=json`);
      inputEl.current.value = data[0].display_name;
    }
    getAddressFromGeolocation();
  }, []);

  const takePicture = async() => {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    setImageUri(imageUrl);
  }

  return (
    <IonPage className="Compose">

      <IonContent>
        <IonList>

          {/* Picture */}
          <IonListHeader>Select an Image</IonListHeader>
          <div className="Camera-container ion-padding">
            <div className="Camera-select-picture" onClick={takePicture}>
              {!imgUri && <IonIcon icon={camera}></IonIcon>}
              {imgUri && <img src={imgUri} alt="picture"/>}
            </div>
          </div>

          {/* Category */}
          <IonListHeader>Select one or more categories</IonListHeader>
          <p>
            <Toggler name="Plumbering"/>
            <Toggler name="Electricity"/>
            <Toggler name="Handyman"/>
            <Toggler name="Gardener"/>
          </p>

          {/* Description */}
          <IonListHeader>Location</IonListHeader>
          <IonItem>
            <IonInput ref={inputEl} placeholder="Address"/>
          </IonItem>

          {/* Description */}
          <IonListHeader>Give a description</IonListHeader>
          <IonItem>
            <IonTextarea placeholder="What do you need?"></IonTextarea>
          </IonItem>

          <div className="Spacing"></div>
        </IonList>
      </IonContent>

      <div className="Publish-Btn-Container">
        <IonButton expand="block" type="submit" class="ion-no-margin">Publish</IonButton>
      </div>
    </IonPage>
  );
};

export default ComposePage;