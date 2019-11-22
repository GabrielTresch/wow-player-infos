import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../containers/Home/HomeContainer';
import Raid from '../containers/RaidProgressContainer';
import Reputations from '../containers/ReputationContainer';
import Achievements from '../containers/AchievementsContainer';
import Stuff from '../containers/StuffContainer';
import Collection from '../containers/Collection/CollectionContainer';
// import Pets from '../containers/Collection/CollectionPetContainer';

const Routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/raid-progression" component={Raid} />
    <Route exact path="/collection/montures" component={Collection} />
    {/* <Route exact path="/collection/mascottes" component={Pets} /> */}
    <Route exact path="/reputations" component={Reputations} />
    <Route exact path="/achevements" component={Achievements} />
    <Route exact path="/equipements" component={Stuff} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
