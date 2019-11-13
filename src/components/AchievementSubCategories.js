import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setActifAchiev } from '../redux/actions';
// import Achievements from './Achievements';

const AchievementSubCategories = ({ categories }) => {
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(setActifAchiev(event.target.value));
  };
  return (
    <div>
      {categories.map((value) => (
        <div key={value.order}>
          {value.isActive === true
              && (
                value.subCategories.length !== 0
                  ? (
                    value.subCategories.map((val) => (
                      <div key={val.id}>
                        <button value={val.id} onClick={handleClick} key={val.id} type="button">{`${val.name} - ${val.id}`}</button>
                        {val.isActive === true
                        && (
                        <>
                          {/* <Achievements
                            // accountAchievements={value.accountAchievements}
                            // achievements={value.achievements}
                            mainSubCategory={mainSubCategory}
                            subCategory={subActif}
                          /> */}
                        </>
                        )}
                      </div>
                    ))
                  )
                  : (
                    <>
                      <button type="button">Global</button>
                      {/* <Achievements /> */}
                    </>
                  )
              )}
        </div>
      ))}
    </div>
  );
};

AchievementSubCategories.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default AchievementSubCategories;
