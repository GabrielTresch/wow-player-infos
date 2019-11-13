import React from 'react';
import PropTypes from 'prop-types';


const Achievements = ({ mainSubCategory, subCategory }) => (
  <div>
    <p>{mainSubCategory}</p>
    <p>{subCategory}</p>
  </div>
);

Achievements.propTypes = {
  mainSubCategory: PropTypes.number.isRequired,
  subCategory: PropTypes.string.isRequired,
};

export default Achievements;
