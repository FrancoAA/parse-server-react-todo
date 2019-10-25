import React from 'react';

import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton
} from '@ionic/react';

const HomePage = () => {

  let posts = [];
  for (let index = 0; index < 3; index++) {
    posts.push({
      image: 'https://via.placeholder.com/100px',
      description: 'This is the description of the job',
      category: 'plumbing'
    });
  }

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Posts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {posts.map(post => (
          <IonCard button={true}>
            <img src={post.image}/>
            <IonCardHeader>
              <IonCardContent>{post.description}</IonCardContent>
            </IonCardHeader>
          </IonCard>
        ))}
      </IonContent>
    </IonApp>
  );
};

export default HomePage;