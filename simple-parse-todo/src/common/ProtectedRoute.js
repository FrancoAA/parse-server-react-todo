import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../common/AuthContextProvider'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isLoggedIn }) => {
      return (
        <Route
          render={props =>
            isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
          }
          {...rest}
        />
      )
    }}
  </AuthConsumer>
);

export default ProtectedRoute;