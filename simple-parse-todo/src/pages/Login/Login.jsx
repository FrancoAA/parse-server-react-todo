import React, { useState } from 'react';
import useForm from "react-hook-form";

import './LoginPage.scss';

const LoginPage = ({ handleSignUp, handleLogin, errorMessage }) => {

  const [signUp, setSignUp] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  const toggleMode = (event) => {
    event.preventDefault();
    setSignUp(prev => !prev);
  };

  const onSubmit = async (values) => {
    if (signUp) {
      await handleSignUp(values);
    }
    else {
      await handleLogin(values);
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage-Container">
        <form name="loginForm" onSubmit={handleSubmit(onSubmit)}>

          <fieldset>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" ref={register({required: 'Required'})} />
            {errors.username && errors.username.message}
          </fieldset>

          {signUp && (
            <fieldset>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" ref={
                register({
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address"
                  }
                })
              }/>
              {errors.email && errors.email.message}
            </fieldset>
          )}

          <fieldset>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={register({required: 'Required'})}/>
            {errors.password && errors.password.message}
          </fieldset>

          {errorMessage && (<p>{errorMessage}</p>)}
          <button type="submit">{signUp ? 'Sign Up' : 'Login'}</button>
          <button onClick={(e) => toggleMode(e)}>{signUp ? 'Login': 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;