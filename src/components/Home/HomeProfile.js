import React from 'react';
import PropTypes from 'prop-types';
import iconHorde from '../../img/faction/horde.png';
import iconAlliance from '../../img/faction/alliance.png';
import './HomeProfile.scss';
import Druid from '../../img/classes/Druid.png';
import Rogue from '../../img/classes/Rogue.png';
import DeathKnight from '../../img/classes/DeathKnight.png';
import DemonHunter from '../../img/classes/DemonHunter.png';
import Hunter from '../../img/classes/Hunter.png';
import Mage from '../../img/classes/Mage.png';
import Monk from '../../img/classes/Monk.png';
import Shaman from '../../img/classes/Shaman.png';
import Warrior from '../../img/classes/Warrior.png';
import Warlock from '../../img/classes/Warlock.png';
import Paladin from '../../img/classes/Paladin.png';
import Priest from '../../img/classes/Priest.png';

const HomeProfile = ({
  profile, media, race, realm, activSpe, activTitle,
}) => (
  <>
    {profile.level !== undefined
      && profile.average_item_level !== undefined
      && profile.name !== undefined
      && race.name !== undefined
      && realm.name !== undefined
      && media.bust_url !== undefined
      && media.render_url !== undefined
      && race.faction.name !== undefined
      && activTitle.name.fr_FR !== undefined
      ? (
        <div className="profile-container profile-item shadow">
          <div className="profile-background" style={{ backgroundImage: `url(${media.render_url})` }} />
          <div className="profile-content">
            <div className="profile-avatar" style={{ backgroundImage: `url(${media.bust_url})` }} />
            <div className="profile-description">
              <div className="profile-name">
                {activTitle.name.fr_FR}
                <span style={{ color: `var(--${activSpe.playable_class.name.en_US.split(' ').join('')})` }}>
                  {` ${profile.name}`}
                </span>
              </div>
              <div className="profile-level">{`Niveau ${profile.level}`}</div>
              <div className="profile-icon">
                {{
                  Druid: (
                    <img src={Druid} alt="classe icon" />
                  ),
                  Rogue: (
                    <img src={Rogue} alt="classe icon" />
                  ),
                  DeathKnight: (
                    <img src={DeathKnight} alt="classe icon" />
                  ),
                  DemonHunter: (
                    <img src={DemonHunter} alt="classe icon" />
                  ),
                  Hunter: (
                    <img src={Hunter} alt="classe icon" />
                  ),
                  Mage: (
                    <img src={Mage} alt="classe icon" />
                  ),
                  Monk: (
                    <img src={Monk} alt="classe icon" />
                  ),
                  Shaman: (
                    <img src={Shaman} alt="classe icon" />
                  ),
                  Warrior: (
                    <img src={Warrior} alt="classe icon" />
                  ),
                  Warlock: (
                    <img src={Warlock} alt="classe icon" />
                  ),
                  Paladin: (
                    <img src={Paladin} alt="classe icon" />
                  ),
                  default: (
                    <img src={Priest} alt="classe icon" />
                  ),
                }[activSpe.playable_class.name.en_US.split(' ').join('')]}
                <span>{`${activSpe.playable_class.name.fr_FR} ${activSpe.name.fr_FR}`}</span>
              </div>
              <div className="profile-icon">
                {race.faction.name.fr_FR === 'Horde' ? <img className="faction-icon" src={iconHorde} alt="hord icon" /> : <img className="faction-icon" src={iconAlliance} alt="alliance icon" />}
                <span>{realm.name.fr_FR}</span>
              </div>
            </div>
          </div>
        </div>
      )
      : <p>Loading...</p>}
  </>
);

HomeProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  media: PropTypes.object.isRequired,
  race: PropTypes.object.isRequired,
  realm: PropTypes.object.isRequired,
  activSpe: PropTypes.object.isRequired,
  activTitle: PropTypes.object.isRequired,
};

export default HomeProfile;
