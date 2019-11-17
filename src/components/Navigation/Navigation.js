import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import UserIcon from '../../assets/img/UserIcon';
import RaidIcon from '../../assets/img/RaidIcon';
import CollectionIcon from '../../assets/img/CollectionIcon';
import ReputationIcon from '../../assets/img/ReputationIcon';
import AchievementIcon from '../../assets/img/AchievementIcon';
import DiscordIcon from '../../assets/img/DiscordIcon';
import WowLogo from '../../assets/img/world-of-warcraft.svg';
// import Avatar from '../../assets/img/avatar.jpg';

const Navigation = () => {
  // const pseudo = useSelector((state) => state.profil.pseudo);
  const avatar = useSelector((state) => state.profil.avatar);
  return (
    <nav>
      <img src={WowLogo} alt="Wow logo" className="wow-logo" />
      {/* </a> */}
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
        <a href="https://discordapp.com/api/oauth2/authorize?client_id=640593176473763841&permissions=317504&scope=bot" target="blank" aria-label="Discord Bot" className="discord-link">
          <DiscordIcon />
        </a>
      </div>
      {avatar ? <img src={avatar} alt="avatar" className="avatar" /> : false}
    </nav>
  );
};

export default Navigation;
