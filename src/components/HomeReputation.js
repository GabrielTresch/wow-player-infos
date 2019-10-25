/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const HomeReputation = ({ reputations }) => (
  <>
    {console.log(reputations)}
    <h2>Reputations</h2>
    {reputations !== undefined
      ? (
        <>
          {reputations.map((value) => (
            <div key={value.category}>
              <h3>{value.category}</h3>
              {value.subCategory.map((test) => (
                <div key={test.subCategory}>
                  <p>{test.subCategory}</p>
                </div>
              ))}
            </div>
          ))}
        </>
      )
      : <p>Loading...</p>}
  </>
);

HomeReputation.propTypes = {
  reputations: PropTypes.array.isRequired,
};

export default HomeReputation;
