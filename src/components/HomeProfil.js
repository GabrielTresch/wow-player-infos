import React from 'react';
import PropTypes from 'prop-types';

const HomeProfil = ({
  profil, media, race, realm,
}) => (
  <>
    {profil.level !== undefined
      && profil.average_item_level !== undefined
      && profil.name !== undefined
      && race.name !== undefined
      && realm.name !== undefined
      && media.bust_url !== undefined
      && race.faction.name !== undefined
      ? (
        <div>
          <h2>Profil</h2>
          <img src={media.bust_url} alt="avatar wow" />
          <div>{`Name: ${profil.name}`}</div>
          <div>{`Race: ${race.name.fr_FR}`}</div>
          <div>{`Faction: ${race.faction.name.fr_FR}`}</div>
          <div>{`Level: ${profil.level}`}</div>
          <div>{`ILevel: ${profil.average_item_level}`}</div>
          <div>{`Realm: ${realm.name.fr_FR}`}</div>
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
};

export default HomeProfil;
