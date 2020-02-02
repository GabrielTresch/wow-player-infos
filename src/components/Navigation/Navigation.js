import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import UserIcon from '../../img/navigation/UserIcon';
// import RaidIcon from '../../img/navigation/RaidIcon';
import CollectionIcon from '../../img/navigation/CollectionIcon';
import ReputationIcon from '../../img/navigation/ReputationIcon';
import AchievementIcon from '../../img/navigation/AchievementIcon';
import DiscordIcon from '../../img/navigation/DiscordIcon';
import WowLogo from '../../img/world-of-warcraft.svg';
import ToggleNav from '../../img/navigation/close.svg';

const Navigation = () => {
  const avatar = useSelector((state) => state.profil.avatar);
  const name = useSelector((state) => state.profil.characterName);
  const level = useSelector((state) => state.profil.level);

  const [navAnim, setNavAnim] = useState();
  const [toggleAnim, setToggleAnim] = useState();
  let navRef = useRef();
  let toggleRef = useRef();

  const toggle = () => {
    navAnim.reversed(!navAnim.reversed());
    toggleAnim.reversed(!toggleAnim.reversed());
    document.querySelector('.navigation').classList.toggle('nav-open');
  };

  useEffect(() => {
    setNavAnim(gsap.to(navRef, 0.2, { width: 160 }, { delay: 0.4 }).reverse());
    setToggleAnim(gsap.to(toggleRef, 0.2, { rotate: 180 }).reverse());
  }, []);

  return (
    <nav className="navigation" ref={(element) => { navRef = element; }}>
      <div className="logo-container">
        <img src={WowLogo} alt="Wow logo" className="wow-logo" />
        <h2>World of Warcraft</h2>
      </div>
      <div className="link-container">
        <NavLink exact to="/" activeClassName="active-link">
          <UserIcon />
          <span>Profil</span>
        </NavLink>
        {/* <NavLink to="/raid-progression" activeClassName="active-link">
          <RaidIcon />
          <span>Raid progression</span>
        </NavLink> */}
        <NavLink to="/collection/montures" activeClassName="active-link">
          <CollectionIcon />
          <span>Collection</span>
        </NavLink>
        <NavLink to="/reputations" activeClassName="active-link">
          <ReputationIcon />
          <span>Réputations</span>
        </NavLink>
        <NavLink to="/achevements" activeClassName="active-link">
          <AchievementIcon />
          <span>Hauts Faits</span>
        </NavLink>
        <a href="https://discordapp.com/api/oauth2/authorize?client_id=640593176473763841&permissions=317504&scope=bot" target="blank" aria-label="Discord Bot" className="discord-link">
          <DiscordIcon />
          <span>Bot discord</span>
        </a>
      </div>
      <button type="button" className="toggle-menu" onClick={toggle} ref={(element) => { toggleRef = element; }}><img src={ToggleNav} alt="toggle navigation" /></button>

      <div className="avatar-container">
        {avatar && <img src={avatar} alt="avatar" className="avatar" />}
        {name && (
        <div>
          <span className="avatar-name">{name}</span>
          <span className="avatar-level">{`Niveau ${level}`}</span>
        </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
