import Parse from 'parse'
import React, { useState, useContext } from 'react';

AuthContext = React.createContext();

initialState = {
  user: null,
  isLoggedIn: false
};


const AuthProvider = props => {
  const [auth, setAuth] = useState(initialState);

  handleSignUp = async({ username, email, password }) => {
    let user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    try {
      await user.signUp();
      setAuth({ user, isLoggedIn: true });  // We shouldn't be storing Parse.Objects on the state
    } catch (error) {
      setAuth({ user: null, isLoggedIn: false });
      handleAuthError(error);
    }
  };

  handleLogin = async({ username, password }) => {
    try {
      const user = await Parse.User.logIn(username, password);
      setAuth({ user, isLoggedIn: true });  // We shouldn't be storing Parse.Objects on the state
    } catch (error) {
      setAuth({ user: null, isLoggedIn: false });
      handleAuthError(error);
    }
  };

  handleLogout = async() => {
    try {
      await Parse.User.logOut();
    } finally {
      setAuth({ user: null, isLoggedIn: false });
    }
  };

  handleAuthError = (error) => {
    console.log("Error: " + error.code + " " + error.message);
  };

  return (
    <AuthContext.Provider values={{ ...auth, handleSignUp, handleLogin, handleLogout, handleAuthError }}>
      {props.children}
    </AuthContext.Provider>
  )
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };

