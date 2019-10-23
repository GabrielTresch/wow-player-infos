import React from 'react';
import PropTypes from 'prop-types';

const HomeSpe = ({ spe }) => (
  <>
    <h2>Specialization</h2>
    {spe.map((value) => (
      <div key={value.specialization}>{value.specialization}</div>
    ))}
  </>
);

HomeSpe.propTypes = {
  spe: PropTypes.array.isRequired,
};

export default HomeSpe;
