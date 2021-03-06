import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { AuthConsumer, AuthProvider } from './common/AuthContextProvider';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';

import { apps, flash, send } from 'ionicons/icons';

import HomePage from './pages/Home/Home';
import { LoginPage, LoginWithAuth } from './pages/Login/Login';
import ChatPage from './pages/Chat/Chat';
import JobDetail from './pages/JobDetail/JobDetail';
import ProfilePage from './pages/Profile/Profile';
import ComposePage from './pages/Compose/Compose';
import ExplorePage from './pages/Explore/Explore';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App = () => {
  return (
    <AuthProvider fake={true}>
      <IonApp>
        <LoginWithAuth protectedComponent={
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/home" component={ExplorePage} exact={true} />
                <Route path="/home/jobs/:jobId" component={JobDetail} exact={true}/>
                <Route path="/home/jobs/:jobId/chats/:chatId" component={ChatPage} />
                <Route path="/publish" component={ComposePage} exact={true} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={flash} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="publish" href="/publish">
                  <IonIcon icon={apps} />
                  <IonLabel>Publish</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                  <IonIcon icon={send} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        }/>
      </IonApp>
    </AuthProvider>
  );
};

export default App;