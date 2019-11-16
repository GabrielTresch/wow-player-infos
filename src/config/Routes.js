import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../containers/HomeContainer';
import Raid from '../containers/RaidProgressContainer';
import Reputations from '../containers/ReputationContainer';
import Achievements from '../containers/AchievementsContainer';
import Mounts from '../containers/Collection/CollectionMountContainer';
import Pets from '../containers/Collection/CollectionPetContainer';

const Routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/raid-progression" component={Raid} />
    <Route path="/collection/montures" component={Mounts} />
    <Route path="/collection/mascottes" component={Pets} />
    <Route exact path="/reputations" component={Reputations} />
    <Route exact path="/achevements" component={Achievements} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
