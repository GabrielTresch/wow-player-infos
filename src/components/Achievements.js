/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Achievement from '../api/Achievements';

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
  console.log(infos);
  return (
    <>
      {infos
        ? (
          infos.map((value) => (
            <p key={value.name}>{value.name}</p>
          ))
        )
        : <p>Loading...</p>}
    </>
  );
};

Achievements.propTypes = {
  allAchievement: PropTypes.array,
  accountAchievements: PropTypes.array.isRequired,
  subCategory: PropTypes.array,
  subCategoryActif: PropTypes.string.isRequired,
};

export default Achievements;
