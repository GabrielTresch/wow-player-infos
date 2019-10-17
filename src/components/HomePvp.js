import React from 'react';
import PropTypes from 'prop-types';

const HomePvp = ({ pvp }) => (
  <>
    <h2>Pvp</h2>
    {pvp.honor_level !== undefined
      && pvp.honorable_kills !== undefined
      && pvp.pvp_map_statistics !== undefined
      ? (
        <>
          <div>{`Honor level: ${pvp.honor_level}`}</div>
          <div>{`Honorable kills: ${pvp.honorable_kills}`}</div>
          <table>
            <thead>
              <tr>
                <th>Map</th>
                <th>Win</th>
                <th>Lose</th>
                <th>Played</th>
              </tr>
            </thead>
            <tbody>
              {pvp.pvp_map_statistics.map((value) => (
                <tr key={value.world_map.id}>
                  <td>{`${value.world_map.name.fr_FR}`}</td>
                  <td>{`${value.match_statistics.won}`}</td>
                  <td>{`${value.match_statistics.lost}`}</td>
                  <td>{`${value.match_statistics.played}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )
      : <p>Loading...</p>}
  </>
);

HomePvp.propTypes = {
  pvp: PropTypes.object.isRequired,
};

export default HomePvp;
