/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import {
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      element={({ location }) => (isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/' : '/ranking',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default Route;
