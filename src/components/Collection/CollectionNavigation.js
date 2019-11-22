import React from 'react';
import { NavLink } from 'react-router-dom';
import './CollectionNavigation.scss';

const CollectionNavigation = () => (
  <div className="collection-navigation">
    <NavLink to="/collection/montures">
      Montures
      <span />
    </NavLink>
    <NavLink to="/collection/mascottes">
      Mascottes
      <span />
    </NavLink>
  </div>
);

export default CollectionNavigation;
