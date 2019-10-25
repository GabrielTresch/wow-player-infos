/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const HomeStats = ({ stats }) => (
  <>
    {stats !== undefined
      && stats.health !== undefined
      && stats.stamina.effective !== undefined
      && stats.spell_crit.value !== undefined
      && stats.spell_crit.rating !== undefined
      && stats.spell_haste.value !== undefined
      && stats.spell_haste.rating !== undefined
      && stats.mastery.value !== undefined
      && stats.mastery.rating !== undefined
      && stats.versatility_damage_done_bonus !== undefined
      && stats.versatility !== undefined
      ? (
        <>
          <h2>Stats</h2>
          <ul>
            <li>{`Health: ${stats.health}`}</li>
            <li>{`Stamina: ${stats.stamina.effective}`}</li>
            <li>{`Spell crit: ${stats.spell_crit.value}% (total: ${stats.spell_crit.rating})`}</li>
            <li>{`Spell haste: ${stats.spell_haste.value}% (total: ${stats.spell_haste.rating})`}</li>
            <li>{`Mastery: ${stats.mastery.value}% (total: ${stats.mastery.rating})`}</li>
            <li>{`Versatility: ${stats.versatility_damage_done_bonus}% (total: ${stats.versatility})`}</li>
          </ul>
        </>
      )
      : <p>Loading...</p>}
  </>
);

HomeStats.propTypes = {
  stats: PropTypes.object.isRequired,
};

export default HomeStats;
