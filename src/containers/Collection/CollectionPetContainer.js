import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../../utils/Request';
import AxiosHeader from '../../utils/AxiosHeader';
import Pet from '../../components/Collection/CollectionPet';
import './CollectionPetContainer.scss';

const fetchData = async (pseudo, realmSlug, region, token) => {
  const header = AxiosHeader(token);
  const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);

  // Collection
  const collection = await request(getProfil.data.collections.href, header);
  const getPets = await request(collection.data.pets.href, header);
  return getPets.data.pets;
};

const CollectionPetContainer = () => {
  const [pets, setPets] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (pseudo && realmSlug && region && token) {
      fetchData(pseudo, realmSlug, region, token).then((data) => setPets(data));
    }
  }, [pseudo, realmSlug, region, token]);
  return (
    <div className="pet-container">
      {pets.map((value, i) => (
        <Pet
        // eslint-disable-next-line react/no-array-index-key
          key={i}
          href={value.species.key.href}
          level={value.level}
          quality={value.quality.name.en_US}
          health={value.stats.health}
          power={value.stats.power}
          speed={value.stats.speed}
        />
      ))}
    </div>
  );
};

export default CollectionPetContainer;
