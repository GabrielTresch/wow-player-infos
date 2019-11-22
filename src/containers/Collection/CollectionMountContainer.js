import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../../utils/Request';
import AxiosHeader from '../../utils/AxiosHeader';
import Mount from '../../components/Collection/CollectionMount';
import './CollectionMountContainer.scss';

const fetchData = async (pseudo, realmSlug, region, token) => {
  const header = AxiosHeader(token);
  const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);

  // Collection
  const collection = await request(getProfil.data.collections.href, header);
  const getMounts = await request(collection.data.mounts.href, header);
  return getMounts.data.mounts;
};

const CollectionMountContainer = () => {
  const [mounts, setMounts] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (pseudo && realmSlug && region && token) {
      fetchData(pseudo, realmSlug, region, token).then((data) => setMounts(data));
    }
  }, [pseudo, realmSlug, region, token]);
  return (
    <div className="mount-container">
      {mounts.map((value) => (
        <Mount
          key={value.mount.id}
          id={value.mount.id}
          href={value.mount.key.href}
        />
      ))}
    </div>
  );
};

export default CollectionMountContainer;
