import React from 'react';

import {
  IonPage,
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
    <IonPage>
      <IonContent>
        {posts.map((post, key) => (
          <IonCard button={true} key={key} routerLink={`/home/jobs/${key}`}>
            <img src={post.image}/>
            <IonCardHeader>
              <IonCardContent>{post.description}</IonCardContent>
            </IonCardHeader>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;