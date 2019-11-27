import React from 'react';
import PropTypes from 'prop-types';

const Leaderboard = ({ leaderboard }) => (
  <table>
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
          <td>{value.guild}</td>
          <td>{`${value.region.toUpperCase()} - ${value.realm}`}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

Leaderboard.propTypes = {
  leaderboard: PropTypes.array.isRequired,
};


export default Leaderboard;
