import React, { Fragment } from 'react';
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
    <>
      {categories.map((value) => (
        <Fragment key={value.order}>
          {value.isActive
          && (
            value.subCategories.length !== 0
              ? (
                <>
                  <select onChange={handleClick} className="select-achiev">
                    {value.subCategories.map((val) => (
                      <option value={val.id} key={val.id}>{val.name}</option>
                    ))}
                  </select>
                  {value.subCategories.map((el) => (
                    el.isActive
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
                  <button type="button" className="select-achiev">Global</button>
                  <Achievements
                    allAchievement={value.achievements}
                    accountAchievements={value.accountAchievements}
                    subCategory={value.subCategories}
                    subCategoryActif={subActif}
                  />
                </>
              )
          )}
        </Fragment>
      ))}
    </>
  );
};

AchievementSubCategories.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default AchievementSubCategories;
