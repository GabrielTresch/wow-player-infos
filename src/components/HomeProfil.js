import React from 'react';
import PropTypes from 'prop-types';
import iconHorde from '../assets/img/horde.png';
import iconAlliance from '../assets/img/alliance.png';

const HomeProfil = ({
  profil, media, race, realm, activSpe, activTitle,
}) => (
  <>
    {profil.level !== undefined
      && profil.average_item_level !== undefined
      && profil.name !== undefined
      && race.name !== undefined
      && realm.name !== undefined
      && media.bust_url !== undefined
      && media.render_url !== undefined
      && race.faction.name !== undefined
      && activTitle.name.fr_FR !== undefined
      ? (
        <div>
          <h2>Profil</h2>
          <img src={media.bust_url} alt="avatar wow" />
          <img src={media.render_url} alt="personnage wow" />
          <div>{`${activTitle.name.fr_FR} ${profil.name}`}</div>
          <div>{`Niveau ${profil.level}`}</div>
          <div>{`${activSpe.playable_class.name.fr_FR} ${activSpe.name.fr_FR}`}</div>
          <div>
            {race.faction.name.fr_FR === 'Horde' ? <img src={iconHorde} alt="hord icon" /> : <img src={iconAlliance} alt="alliance icon" />}
            <span>{realm.name.fr_FR}</span>
          </div>
        </div>
      )
      : <p>Loading...</p>}
  </>
);

HomeProfil.propTypes = {
  profil: PropTypes.object.isRequired,
  media: PropTypes.object.isRequired,
  race: PropTypes.object.isRequired,
  realm: PropTypes.object.isRequired,
  activSpe: PropTypes.object.isRequired,
  activTitle: PropTypes.object.isRequired,
};

export default HomeProfil;
