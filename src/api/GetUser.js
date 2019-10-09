import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = {
  auth: {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD,
  },
  params: {
    grant_type: 'client_credentials',
    scope: 'public',
  },
};

const GetUser = () => {
  const [wow, setWow] = useState({
    user: [],
    race: [],
    realm: [],
    spec: [],
    media: [],
    titles: [],
    mounts: [],
  });
  useEffect(() => {
    async function fetchData() {
      const getToken = await axios(
        'https://eu.battle.net/oauth/token', Auth,
      );
      const token = getToken.data;
      const header = {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      };
      const profil = await axios(
        'https://cors-anywhere.herokuapp.com/https://eu.api.blizzard.com/profile/wow/character/kaelthas/yashuki?namespace=profile-eu&locale=fr_EU', header,
      );
      // Profil
      const race = await axios(profil.data.race.key.href, header);
      const realm = await axios(profil.data.realm.key.href, header);
      const media = await axios(profil.data.media.href, header);
      // Specialization
      const spec = await axios(profil.data.active_spec.key.href, header);
      // Titles
      const titles = await axios(profil.data.titles.href, header);
      // Collection
      const collection = await axios(profil.data.collections.href, header);
      const getMounts = await axios(collection.data.mounts.href, header);
      const mountArray = [];
      getMounts.data.mounts.forEach(async (e, i) => {
        setTimeout(async () => {
          const mount = await axios(e.mount.key.href, header);
          const mountImages = await axios(mount.data.creature_displays[0].key.href, header);
          mountArray.push({
            id: i,
            name: mount.data.name.fr_FR,
            description: mount.data.description.fr_FR,
            source: mount.data.source ? mount.data.source.name.fr_FR : '',
            img: mountImages.data.assets[2].value,
          });
          setWow({
            user: profil.data,
            race: race.data,
            realm: realm.data,
            spec: spec.data,
            media: media.data,
            mounts: [...mountArray],
            titles: titles.data,
          });
        }, i * 100);
      });
      setWow({
        user: profil.data,
        race: race.data,
        realm: realm.data,
        spec: spec.data,
        media: media.data,
        titles: titles.data,
      });
    }
    fetchData();
  }, []);
  console.log(wow.mounts);
  // console.log(wow.spec.pvp_talents);
  return (
    <>
      <h1>Wow player info</h1>
      {wow.user.name
        ? (
          <>
            <div>
              <h2>Profil</h2>
              <img src={wow.media.bust_url} alt="avatar wow" />
              <div>{`Name: ${wow.user.name}`}</div>
              <div>{`Race: ${wow.race.name.fr_FR}`}</div>
              <div>{`Class: ${wow.spec.playable_class.name.fr_FR}`}</div>
              <div>{`Specialization: ${wow.spec.name.fr_FR}`}</div>
              <div>{`Faction: ${wow.race.faction.name.fr_FR}`}</div>
              <div>{`Level: ${wow.user.level}`}</div>
              <div>{`ILevel: ${wow.user.average_item_level}`}</div>
              <div>{`Realm: ${wow.realm.name.fr_FR}`}</div>
            </div>
            <div>
              <h2>Specialization</h2>
              <div>{`Class: ${wow.spec.playable_class.name.fr_FR}`}</div>
              <div>{`Specialization: ${wow.spec.name.fr_FR}`}</div>
            </div>
            <div>
              <h2>Mount</h2>
              {wow.mounts
                ? (
                  wow.mounts.map((value) => (
                    <div key={value.id}>
                      <h3>{value.name}</h3>
                      <p>{value.description}</p>
                      <p>{value.source}</p>
                      <img src={value.img} alt={value.name.fr_FR} />
                    </div>
                  ))
                )
                : <p>Loading mounts...</p>}
            </div>
            <div>
              <h2>Titles</h2>
              {wow.titles.titles.map((value) => (
                <div key={value.id}>{value.name.fr_FR}</div>
              ))}
            </div>
            {/* <div>
              <h2>test</h2>
              {wow.spec.pvp_talents.map((value) => (
                <div>{value.spell_tooltip.description.fr_FR}</div>
              ))}
            </div> */}
          </>
        )
        : <p>Loading...</p>}
    </>
  );
};

export default GetUser;
