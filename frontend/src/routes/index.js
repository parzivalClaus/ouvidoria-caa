import React from "react";
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from "~/pages/Login";
import Register from '~/pages/Register';
import RecoveryPass from '~/pages/RecoveryPass';
import UserDashboard from '~/pages/UserDashboard';
import CreateManifestation from '~/pages/CreateManifestation';
import Manifestations from '~/pages/Manifestations';
import FullManifestation from '~/pages/FullManifestation';
import Profile from '~/pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/recovery-pass" exact component={RecoveryPass} />

      <Route path="/user-dashboard" exact component={UserDashboard} isPrivate />
      <Route path="/create-manifestation" exact component={CreateManifestation} isPrivate />
      <Route path="/manifestations" exact component={Manifestations} isPrivate />
      <Route path="/manifestation/:questionProtocol" exact component={FullManifestation} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />
    </Switch>
  );
}
