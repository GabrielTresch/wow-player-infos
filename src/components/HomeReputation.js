import React from 'react';
import PropTypes from 'prop-types';

const HomeReputation = ({ reputations }) => (
  <>
    <h2>Reputations</h2>
    {reputations.map((value) => (
      <div key={value.category}>
        <h3>{`- ${value.category}`}</h3>
        <ul>
          {value.reputations.map((repute) => (
            <li key={repute.name}>{`${repute.name} : ${repute.value} / ${repute.max} -> ${repute.status}`}</li>
          ))}
        </ul>
      </div>
    ))}
  </>
);

HomeReputation.propTypes = {
  reputations: PropTypes.array.isRequired,
};

export default HomeReputation;
