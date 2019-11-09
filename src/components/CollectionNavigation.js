import React from 'react';
import { NavLink } from 'react-router-dom';

const CollectionNavigation = () => (
  <div>
    <NavLink to="/collection/montures">Montures </NavLink>
    <NavLink to="/collection/mascottes">Mascottes </NavLink>
  </div>
);

export default CollectionNavigation;
