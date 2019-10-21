import Parse from 'parse'
import React, { useState } from 'react';

const AuthContext = React.createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
  errorMessage: null
};

const AuthProvider = props => {
  const [auth, setAuth] = useState(initialState);

  const handleSignUp = async({ username, email, password }) => {
    let user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    try {
      await user.signUp();
      setAuth({ user, isLoggedIn: true });  // We shouldn't be storing Parse.Objects on the state
    } catch (error) {
      setAuth({ user: null, isLoggedIn: false, errorMessage: error.message });
    }
  };

  const handleLogin = async({ username, password }) => {
    try {
      const user = await Parse.User.logIn(username, password);
      setAuth({ user, isLoggedIn: true });  // We shouldn't be storing Parse.Objects on the state
    } catch (error) {
      setAuth({ user: null, isLoggedIn: false, errorMessage: error.message });
    }
  };

  const handleLogout = async() => {
    try {
      await Parse.User.logOut();
    } finally {
      setAuth({ user: null, isLoggedIn: false });
    }
  };

  const handleAuthError = (error) => {
    console.log("Error: " + error.code + " " + error.message);
  };



  return (
    <AuthContext.Provider value={{
      handleSignUp, 
      handleLogin, 
      handleLogout, 
      handleAuthError,
      ...auth
      }}>
      {props.children}
    </AuthContext.Provider>
  )
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };

