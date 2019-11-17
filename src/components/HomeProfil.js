import React from 'react';
import PropTypes from 'prop-types';

const HomeProfil = ({
  profil, media, race, realm, activSpe, activTitle,
}) => (
  <>
    {console.log(activTitle, '---', activSpe)}
    {profil.level !== undefined
      && profil.average_item_level !== undefined
      && profil.name !== undefined
      && race.name !== undefined
      && realm.name !== undefined
      && media.bust_url !== undefined
      && race.faction.name !== undefined
      && activTitle.name.fr_FR !== undefined
      ? (
        <div>
          <h2>Profil</h2>
          <img src={media.bust_url} alt="avatar wow" />
          <img src={media.render_url} alt="personnage wow" />
          <div>{`Name: ${profil.name}`}</div>
          <div>{`Title: ${activTitle.name.fr_FR}`}</div>
          <div>{`${activSpe.playable_class.name.fr_FR} ${activSpe.name.fr_FR}`}</div>
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
  activSpe: PropTypes.object.isRequired,
  activTitle: PropTypes.object.isRequired,
};

export default HomeProfil;
