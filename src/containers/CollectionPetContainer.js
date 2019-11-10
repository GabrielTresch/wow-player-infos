import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';
import CollectionNavigation from '../components/CollectionNavigation';
import Pet from '../components/CollectionPet';

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
  console.log(pets);
  return (
    <>
      <CollectionNavigation />
      <h1>Mascottes</h1>
      {pets.map((value, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          <Pet
            href={value.species.key.href}
            level={value.level}
            quality={value.quality.name.fr_FR}
          />
        </div>
      ))}
    </>
  );
};

export default CollectionPetContainer;
