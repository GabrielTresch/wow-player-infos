import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActifAchiev } from '../redux/actions';
import AchievementsCategories from '../api/AchievementsCategories';
import AchievementSubCategories from '../components/Achievements/AchievementSubCategories';

// eslint-disable-next-line max-len
const fetchData = async (pseudo, realmSlug, region, token, actif) => AchievementsCategories(pseudo, realmSlug, region, token, actif);

const AchievementsContainer = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [actif, setActif] = useState(1);
  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (pseudo && realmSlug && region && token) {
      fetchData(pseudo, realmSlug, region, token, actif).then((data) => {
        setCategories(data);
        if (data !== undefined) {
          data.forEach((value) => {
            if (value.isActive === true) {
              if (value.subCategories.length !== 0) {
                dispatch(setActifAchiev(value.subCategories[0].id.toString()));
              } else {
                dispatch(setActifAchiev('0'));
              }
            }
          });
        }
      });
    }
  }, [pseudo, realmSlug, region, actif, token, dispatch]);
  return (
    <>
      {categories !== undefined
        ? (
          <>
            <div>
              {categories.map((value) => (
                <button value={value.order} onClick={(e) => setActif(e.target.value)} type="button" key={value.order}>{value.rootCategory}</button>
              ))}
            </div>
            <br />
            <AchievementSubCategories categories={categories} />
          </>
        )
        : <p>Loading...</p>}
    </>
  );
};

export default AchievementsContainer;
