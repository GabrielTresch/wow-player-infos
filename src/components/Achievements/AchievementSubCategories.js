import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setActifAchiev } from '../../redux/actions';
import Achievements from './Achievements';

const AchievementSubCategories = ({ categories }) => {
  const dispatch = useDispatch();
  const subActif = useSelector((state) => state.subActif);

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
                    <>
                      <select onChange={handleClick}>
                        {value.subCategories.map((val) => (
                          <option value={val.id} key={val.id}>{`${val.name} - ${val.id}`}</option>
                        ))}
                      </select>
                      {value.subCategories.map((el) => (
                        el.isActive === true
                        && (
                          <div key={subActif}>
                            <Achievements
                              allAchievement={value.achievements}
                              accountAchievements={value.accountAchievements}
                              subCategory={value.subCategories}
                              subCategoryActif={subActif}
                            />
                          </div>
                        )
                      ))}
                    </>
                  )
                  : (
                    <>
                      <button type="button">Global</button>
                      <Achievements
                        allAchievement={value.achievements}
                        accountAchievements={value.accountAchievements}
                        subCategory={value.subCategories}
                        subCategoryActif={subActif}
                      />
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
