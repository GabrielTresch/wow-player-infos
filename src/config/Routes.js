import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../containers/HomeContainer';
import Raid from '../containers/RaidProgressContainer';
import Collection from '../containers/CollectionContainer';
import Reputations from '../containers/ReputationContainer';
import Achievements from '../containers/AchievementsContainer';

const Routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/raid-progression" component={Raid} />
    <Route exact path="/collection" component={Collection} />
    <Route exact path="/reputations" component={Reputations} />
    <Route exact path="/achevements" component={Achievements} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
