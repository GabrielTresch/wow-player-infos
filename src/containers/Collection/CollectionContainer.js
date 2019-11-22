import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CollectionNavigation from '../../components/Collection/CollectionNavigation';
import CollectionMountContainer from './CollectionMountContainer';
import CollectionPetContainer from './CollectionPetContainer';

export default function NestingExample() {
  return (
    <Router>
      <CollectionNavigation />
      <Switch>
        <Route exact path="/collection/montures">
          <CollectionMountContainer />
        </Route>
        <Route path="/collection/mascottes">
          <CollectionPetContainer />
        </Route>
      </Switch>
    </Router>
  );
}
