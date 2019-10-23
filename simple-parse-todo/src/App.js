import React, { Component } from 'react';
import { AuthConsumer, AuthProvider } from './common/AuthContextProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TodoApp from './TodoApp/TodoApp';
import LoginPage from './pages/Login/Login';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import ComposePage from './pages/Compose/Compose';

const App = (props) => {
  return (
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
  );
};

export default App;