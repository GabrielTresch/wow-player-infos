import React from 'react';
import PropTypes from 'prop-types';

const HomeReputation = ({ reputations }) => (
  <>
    <h2>Reputations</h2>
    {reputations.reputations !== undefined
      ? (
        <table>
          <tbody>
            {reputations.reputations.map((value) => (
              <tr key={value.faction.id}>
                <td>{value.faction.name.fr_FR}</td>
                <td>{`${value.standing.value} / ${value.standing.max}`}</td>
                <td>{value.standing.name.fr_FR}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
      : <p>Loading...</p>}
  </>
);

HomeReputation.propTypes = {
  reputations: PropTypes.object.isRequired,
};

export default HomeReputation;
