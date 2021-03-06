import React from 'react';
import PropTypes from 'prop-types';
import './Leaderboard.scss';

const Leaderboard = ({ leaderboard }) => (
  <div className="row-wrapper">
    <table className="leaderboard">
      <thead>
        <tr>
          <th>rank</th>
          <th>guild</th>
          <th>realm</th>
        </tr>
      </thead>
      <tbody>

        {leaderboard.map((value, i) => (
          <tr key={value.date}>
            <td>{i + 1}</td>
            <td style={{ color: `var(--${value.faction})` }}>{value.guild}</td>
            <td>{`${value.region.toUpperCase()} - ${value.realm}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Leaderboard.propTypes = {
  leaderboard: PropTypes.array.isRequired,
};


export default Leaderboard;
