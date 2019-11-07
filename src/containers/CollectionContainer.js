import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';
import AxiosAuth from '../utils/AxiosAuth';
import Mount from '../components/Mount';

const fetchData = async (pseudo, realmSlug, region) => {
  const Auth = AxiosAuth();
  const getToken = await request('https://eu.battle.net/oauth/token', Auth);
  const header = AxiosHeader(getToken.data.access_token);
  const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);

  // Collection
  const collection = await request(getProfil.data.collections.href, header);
  const getMounts = await request(collection.data.mounts.href, header);
  return getMounts.data.mounts;
};

const CollectionContainer = () => {
  const [mounts, setMounts] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);

  useEffect(() => {
    if (pseudo && realmSlug && region) {
      fetchData(pseudo, realmSlug, region).then((data) => setMounts(data));
    }
  }, [pseudo, realmSlug, region]);
  return (
    <>
      <h1>Collection</h1>
      {mounts.map((value) => (
        <div key={value.mount.id}>
          <Mount
            id={value.mount.id}
            href={value.mount.key.href}
          />
        </div>
      ))}
    </>
  );
};

export default CollectionContainer;
