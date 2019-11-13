import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AchievementsCategories from '../api/AchievementsCategories';

const fetchData = async (token, actif) => AchievementsCategories(token, actif);

const AchievementsContainer = () => {
  const [categories, setCategories] = useState([]);
  const [actif, setActif] = useState(1);
  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);
  const token = useSelector((state) => state.token);

  // const handleClick = (event) => setActif([event.target.value]);

  useEffect(() => {
    if (pseudo && realmSlug && region && token) {
      fetchData(token, actif).then((data) => setCategories(data));
    }
  }, [pseudo, realmSlug, region, actif, token]);
  console.log(categories);
  return (
    <>
      <h1>Hauts Faits</h1>
      {categories !== undefined
        ? (
          <div>
            {categories.map((value) => (
              <button value={value.order} onClick={(e) => setActif(e.target.value)} type="button" key={value.order}>{value.rootCategories}</button>
            ))}
          </div>
        )
        : <p>Loading...</p>}
    </>
  );
};

export default AchievementsContainer;
