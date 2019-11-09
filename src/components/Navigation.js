import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <NavLink exact to="/">Profil </NavLink>
    <NavLink to="/raid-progression">Raid progression </NavLink>
    <NavLink to="/collection/montures">Collection </NavLink>
    <NavLink to="/reputations">Réputation </NavLink>
    <NavLink to="/achevements">Achèvements </NavLink>
    <a href="https://discordapp.com/api/oauth2/authorize?client_id=640593176473763841&permissions=317504&scope=bot" target="blank">bot discord</a>
  </nav>
);

export default Navigation;
