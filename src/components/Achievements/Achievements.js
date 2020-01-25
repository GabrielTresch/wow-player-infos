/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Achievement from '../../api/Achievements';
import './Achievements.scss';
import Blason from '../../img/navigation/StuffIcon';

const Achievements = ({
  allAchievement,
  accountAchievements,
  subCategory,
  subCategoryActif,
}) => {
  const token = useSelector((state) => state.token);
  const [infos, setInfos] = useState(null);
  useEffect(() => {
    let isSubscribed = true;
    Achievement(subCategory, subCategoryActif, accountAchievements, allAchievement, token).then((data) => {
      if (isSubscribed) {
        setInfos(data);
      }
    });
    // eslint-disable-next-line no-return-assign
    return () => isSubscribed = false;
  }, [accountAchievements, subCategory, subCategoryActif, allAchievement, token]);
  return (
    <div className="achievement-container">
      {infos
        ? (
          infos.map((value) => (
            <div key={value.id} className="achievement-vignette">
              <img src={value.icon} alt={value.name} className="achievement-icon" />
              <div className="achievement-description">
                <h3>
                  {value.name}
                </h3>
                <p>{value.description}</p>
              </div>
              <div className="achievement-infos">
                <span>
                  <Blason />
                  {value.points}
                </span>
                {value.date && <p>{value.date}</p>}
              </div>
            </div>
          ))
        )
        : <p>Loading...</p>}
    </div>
  );
};

Achievements.propTypes = {
  allAchievement: PropTypes.array,
  accountAchievements: PropTypes.array.isRequired,
  subCategory: PropTypes.array,
  subCategoryActif: PropTypes.string.isRequired,
};

export default Achievements;
