import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <NavLink exact to="/">Profil </NavLink>
    <NavLink to="/raid-progression">Raid progression </NavLink>
    <NavLink to="/collection">Collection </NavLink>
    <NavLink to="/reputations">Réputation </NavLink>
    <NavLink to="/achevements">Achèvements </NavLink>
  </nav>
);

export default Navigation;
