import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isSector,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const { access_level } = store.getState().user.profile;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    if (access_level === 1) {
      return <Redirect to="/manifestations" />;
    }
    return <Redirect to="/user-dashboard" />;
  }


  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
