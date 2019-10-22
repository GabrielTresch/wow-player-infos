import React from 'react';
import PropTypes from 'prop-types';

const HomeSpe = ({ spe }) => (
  <>
    <h2>Specialization</h2>
    {spe.length !== 0
      ? (
        spe.map((value) => (
          <div key={value.specialization}>{value.specialization}</div>
        ))
      )
      : <p>Loading...</p>}
  </>
);

HomeSpe.propTypes = {
  spe: PropTypes.array.isRequired,
};

export default HomeSpe;
