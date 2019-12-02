import React from 'react';
import PropTypes from 'prop-types';
import './HomeStuff.scss';
import AzeriteBorder from '../../img/azerith-border.png';

const HomeStuff = ({ stuff }) => (
  <div className="stuff-container stuff-item item shadow">
    <ul>
      {stuff.map((value) => (
        <li key={value.name}>
          <div>
            {value.azerite !== false
             && (<img className="stuff-azerite" src={AzeriteBorder} alt="bordure azerite" />)}
            <img className="stuff-icon" src={value.icon} alt={value.name} />
          </div>
          <span className="stuff-name" style={{ color: `var(--${value.quality})` }}>{value.name}</span>
          <span className="stuff-level">{value.level}</span>
        </li>
      ))}
    </ul>
  </div>
);

HomeStuff.propTypes = {
  stuff: PropTypes.array.isRequired,
};

export default HomeStuff;
