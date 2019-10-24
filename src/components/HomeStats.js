/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const HomeStats = ({ stats }) => (
  <>
    {console.log(stats)}
    <h2>Stats</h2>
    <ul>
      <li>{`Health: ${stats.health}`}</li>
      {/* <li>{`Stamina: ${stats.stamina.effective}`}</li> */}
      {/* <li>{`Spell crit: ${stats.spell_crit.value}% (total: ${stats.spell_crit.rating})`}</li> */}
      {/* <li>{`Spell hast: ${stats.spell_hast.value}% (total: ${stats.spell_hast.rating})`}</li> */}
      {/* <li>{`Mastery: ${stats.mastery.value}% (total: ${stats.mastery.rating})`}</li> */}
      <li>{`Versatility: ${stats.versatility_damage_done_bonus}% (total: ${stats.versatility})`}</li>
    </ul>
  </>
);

HomeStats.propTypes = {
  stats: PropTypes.object.isRequired,
};

export default HomeStats;
