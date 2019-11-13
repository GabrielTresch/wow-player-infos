import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AchievementsCategories from '../api/AchievementsCategories';

const fetchData = async (token) => AchievementsCategories(token);

const AchievementsContainer = () => {
  const [categories, setCategories] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (pseudo && realmSlug && region && token) {
      fetchData(token).then((data) => setCategories(data));
    }
  }, [pseudo, realmSlug, region, token]);
  console.log(categories);
  return (
    <h1>Hauts Faits</h1>
  );
};

export default AchievementsContainer;
