import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonPage
} from '@ionic/react';

import { apps, flash, send } from 'ionicons/icons';

import HomePage from './Home/Home';
import { LoginWithAuth } from './Login/Login';
import ChatPage from './Chat/Chat';
import JobDetail from './JobDetail/JobDetail';
import ProfilePage from './Profile/Profile';
import ComposePage from './Compose/Compose';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const AppStack = () => {
  return (
    <IonPage>
      <Route exact path="/" render={() => <Redirect to="/home"/>}/>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={HomePage} exact={true} />
          <Route path="/jobs/:jobId" component={JobDetail} exact={true}/>
          <Route path="/jobs/:jobId/chats/:chatId" component={ChatPage} />
          <Route path="/publish" component={ComposePage} />
          <Route path="/profile" component={ProfilePage} />
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
    </IonPage>
  );
};

export default AppStack;

/*
<AuthProvider>
      <AuthConsumer>
        {({isLoggedIn, handleSignUp, handleLogin, errorMessage}) => (
          <div>
            {isLoggedIn && (
              <Router>
                <Switch>
                  <Route path="/" component={TodoApp} />
                </Switch>
              </Router>
            )}
            {!isLoggedIn && <LoginPage handleSignUp={handleSignUp} handleLogin={handleLogin} errorMessage={errorMessage} />}
          </div>
        )}
      </AuthConsumer>
    </AuthProvider>
*/