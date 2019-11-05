import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";

import {
  IonPage,
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
} from "@ionic/react";

import "./LoginPage.scss";
import TextInput from './components/TextInput';

import { AuthConsumer } from "../../common/AuthContextProvider";

const LoginPage = ({ handleSignUp, handleLogin, errorMessage }) => {
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const updateValues = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value.trim() }));
  };

  const toggleMode = event => {
    event.preventDefault();
    setSignUp(prev => !prev);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (signUp) {
      await handleSignUp(formData);
    } else {
      await handleLogin(formData);
    }
  };

  return (
    <IonPage className="LoginPage">
      <IonContent>
        <div className="LoginContainer">
          <form name="loginForm" onSubmit={onSubmit}>
            <TextInput name="username" type="text" placeholder="Username" onChange={e => updateValues(e.target.name, e.target.value)}/>
            {signUp && (
              <TextInput name="email" type="email" placeholder="Email" onChange={e => updateValues(e.target.name, e.target.value)}/>
            )}
            <TextInput name="password" type="password" placeholder="Password" onChange={e => updateValues(e.target.name, e.target.value)}/>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="ion-padding">
                <IonButton type="submit" expand="block">
                  {signUp ? "Sign Up" : "Login"}
                </IonButton>
                <IonButton
                  fill="outline"
                  expand="block"
                  onClick={e => toggleMode(e)}
                >
                  {signUp ? "Login" : "Sign Up"}
                </IonButton>
              </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

const LoginWithAuth = ({ protectedComponent: ProtectedComponent }) => (
  <AuthConsumer>
    {({ isLoggedIn, handleSignUp, handleLogin, errorMessage }) =>
      isLoggedIn ? ProtectedComponent
: (
        <LoginPage
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          errorMessage={errorMessage}
        />
      )
    }
  </AuthConsumer>
);

export {LoginPage, LoginWithAuth};
