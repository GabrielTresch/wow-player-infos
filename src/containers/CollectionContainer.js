import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../api/Request';
import AxiosHeader from '../api/AxiosHeader';
import AxiosAuth from '../api/AxiosAuth';

const CollectionContainer = () => {
  const [mounts, setMounts] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);

  useEffect(() => {
    const fetchData = async () => {
      const Auth = AxiosAuth();
      const getToken = await request('https://eu.battle.net/oauth/token', Auth);
      const header = AxiosHeader(getToken.data.access_token);
      const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);

      // Collection
      const collection = await request(getProfil.data.collections.href, header);
      const getMounts = await request(collection.data.mounts.href, header);
      if (localStorage.getItem('Mounts') === null || JSON.parse(localStorage.getItem('Mounts')).length < getMounts.data.mounts.length) {
        const mountArray = [];
        getMounts.data.mounts.forEach(async (e, i) => {
          setTimeout(async () => {
            const mount = await request(e.mount.key.href, header);
            const mountImg = await request(mount.data.creature_displays[0].key.href, header);
            mountArray.push({
              id: i,
              name: mount.data.name.fr_FR,
              description: mount.data.description.fr_FR,
              source: mount.data.source ? mount.data.source.name.fr_FR : '',
              img: mountImg.data.assets[2].value,
            });
            setMounts([...mountArray]);
            localStorage.setItem('Mounts', JSON.stringify(mountArray));
          }, i * 100);
        });
      } else {
        setMounts(JSON.parse(localStorage.getItem('Mounts')));
      }
    };
    if (pseudo !== undefined) {
      fetchData();
    }
  }, [pseudo, realmSlug, region]);
  return (
    <>
      <h1>Collection</h1>
      {mounts !== undefined
        ? (
          mounts.map((value) => (
            <div key={value.id}>
              <h3>{value.name}</h3>
              <p>{value.description}</p>
              <p>{value.source}</p>
              <img src={value.img} alt={value.name.fr_FR} />
            </div>
          ))
        )
        : <p>Loading mounts...</p>}
    </>
  );
};

export default CollectionContainer;
