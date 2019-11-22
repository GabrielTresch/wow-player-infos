import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import UserIcon from '../../img/navigation/UserIcon';
import RaidIcon from '../../img/navigation/RaidIcon';
import CollectionIcon from '../../img/navigation/CollectionIcon';
import ReputationIcon from '../../img/navigation/ReputationIcon';
import AchievementIcon from '../../img/navigation/AchievementIcon';
import StuffIcon from '../../img/navigation/StuffIcon';
import DiscordIcon from '../../img/navigation/DiscordIcon';
import WowLogo from '../../img/world-of-warcraft.svg';

const Navigation = () => {
  const avatar = useSelector((state) => state.profil.avatar);
  return (
    <nav>
      <img src={WowLogo} alt="Wow logo" className="wow-logo" />
      <div className="link-container">
        <NavLink exact to="/" activeClassName="active-link">
          <UserIcon />
        </NavLink>
        <NavLink to="/raid-progression" activeClassName="active-link">
          <RaidIcon />
        </NavLink>
        <NavLink to="/collection/montures" activeClassName="active-link">
          <CollectionIcon />
        </NavLink>
        <NavLink to="/reputations" activeClassName="active-link">
          <ReputationIcon />
        </NavLink>
        <NavLink to="/achevements" activeClassName="active-link">
          <AchievementIcon />
        </NavLink>
        <NavLink to="/equipements" activeClassName="active-link">
          <StuffIcon />
        </NavLink>
        <a href="https://discordapp.com/api/oauth2/authorize?client_id=640593176473763841&permissions=317504&scope=bot" target="blank" aria-label="Discord Bot" className="discord-link">
          <DiscordIcon />
        </a>
      </div>
      {avatar ? <img src={avatar} alt="avatar" className="avatar" /> : false}
    </nav>
  );
};

export default Navigation;
