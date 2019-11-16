import React from 'react';
import { NavLink } from 'react-router-dom';
import './CollectionNavigation.scss';

const CollectionNavigation = () => (
  <div className="collection-navigation">
    <NavLink to="/collection/montures" activeClassName="active-link">
      Montures
      <span />
    </NavLink>
    <NavLink to="/collection/mascottes" activeClassName="active-link">
      Mascottes
      <span />
    </NavLink>
  </div>
);

export default CollectionNavigation;
