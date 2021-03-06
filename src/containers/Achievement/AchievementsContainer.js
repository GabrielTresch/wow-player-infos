import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActifAchiev } from '../../redux/actions';
import AchievementsCategories from '../../api/AchievementsCategories';
import AchievementSubCategories from '../../components/Achievements/AchievementSubCategories';
import './AchievementsContainer.scss';

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
        if (data) {
          data.forEach((value) => {
            if (value.isActive) {
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
            <select onChange={(event) => setActif(event.target.value)} className="select-achiev">
              {categories.map((value) => (
                <option value={value.order} key={value.order}>{value.rootCategory}</option>
              ))}
            </select>
            <AchievementSubCategories categories={categories} />
          </>
        )
        : <p>Loading...</p>}
    </>
  );
};

export default AchievementsContainer;
