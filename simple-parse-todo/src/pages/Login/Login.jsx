import React, { useState, useEffect } from 'react';
import useForm from "react-hook-form";

import {
  IonApp,
  IonContent,
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItemGroup,
  IonItemDivider
} from '@ionic/react';

import './LoginPage.scss';

const LoginPage = ({ handleSignUp, handleLogin, errorMessage }) => {

  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const updateValues = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  }

  const toggleMode = (event) => {
    event.preventDefault();
    setSignUp(prev => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (signUp) {
      await handleSignUp(formData);
    }
    else {
      await handleLogin(formData);
    }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form name="loginForm" onSubmit={onSubmit}>
          <IonList>
            <IonItem>
              <IonLabel>Username</IonLabel>
              <IonInput name="username" type="text" required onIonChange={updateValues}/>
            </IonItem>

            {signUp && (
              <IonItem>
                <IonLabel>Email</IonLabel>
                <IonInput name="email" type="email" required onIonChange={updateValues}/>
              </IonItem>
            )}

            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonInput name="password" type="password" required onIonChange={updateValues}/>
            </IonItem>

            {errorMessage && (<IonItem>{errorMessage}</IonItem>)}

            <div className="ion-padding">
              <button type="submit">{signUp ? 'Sign Up' : 'Login'}</button>
              <button onClick={(e) => toggleMode(e)}>{signUp ? 'Login': 'Sign Up'}</button>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonApp>
  );
};

export default LoginPage;