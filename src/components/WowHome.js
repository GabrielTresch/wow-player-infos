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
    specActive: [],
    spec: [],
    media: [],
    titles: [],
    mounts: [],
    reputation: [],
    pvp: [],
    achiev: [],
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
      const specActive = await axios(profil.data.active_spec.key.href, header);
      const spec = await axios(profil.data.specializations.href, header);
      // Titles
      const titles = await axios(profil.data.titles.href, header);
      // Réputations
      const reputation = await axios(profil.data.reputations.href, header);
      // PVP
      const pvp = await axios(profil.data.pvp_summary.href, header);
      // Achievement
      const achievement = await axios(profil.data.achievements.href, header);
      const categoryArray = [];
      const parentCategoryArray = [];
      achievement.data.category_progress.forEach(async (e, i) => {
        setTimeout(async () => {
          // console.log(e);
          const category = await axios(e.category.key.href, header);
          // console.log(category.data);
          // eslint-disable-next-line max-len
          // console.log(category.data.parent_category ? category.data.parent_category.name.fr_FR : false);
          categoryArray.push({
            id: i,
            categoryParent: category.data.parent_category
              ? category.data.parent_category.name.fr_FR : '',
            category: category.data.name.fr_FR,
          });
          if (category.data.parent_category === undefined) {
            parentCategoryArray.push(category.data.name.fr_FR);
          }
          // console.log(parentCategoryArray);
          parentCategoryArray.forEach((el) => {
            console.log(el);
            // eslint-disable-next-line array-callback-return
            const test = categoryArray.filter((element) => element.categoryParent === el);
            console.log(test);
          });
          // console.log(categoryArray);
          // setWow({
          //   user: profil.data,
          //   race: race.data,
          //   realm: realm.data,
          //   specActive: specActive.data,
          //   spec: spec.data,
          //   media: media.data,
          //   titles: titles.data,
          //   reputation: reputation.data,
          //   pvp: pvp.data,
          //   achiev: [...categoryArray],
          // });
        }, i * 100);
      });
      // console.log(categoryArray);
      // eslint-disable-next-line max-len
      // Collection
      // const collection = await axios(profil.data.collections.href, header);
      // const getMounts = await axios(collection.data.mounts.href, header);
      // const mountArray = [];
      // getMounts.data.mounts.forEach(async (e, i) => {
      //   setTimeout(async () => {
      //     const mount = await axios(e.mount.key.href, header);
      //     const mountImg = await axios(mount.data.creature_displays[0].key.href, header);
      //     mountArray.push({
      //       id: i,
      //       name: mount.data.name.fr_FR,
      //       description: mount.data.description.fr_FR,
      //       source: mount.data.source ? mount.data.source.name.fr_FR : '',
      //       img: mountImg.data.assets[2].value,
      //     });
      //     setWow({
      //       user: profil.data,
      //       race: race.data,
      //       realm: realm.data,
      //       specActive: specActive.data,
      //       spec: spec.data,
      //       media: media.data,
      //       mounts: [...mountArray],
      //       titles: titles.data,
      //       reputation: reputation.data,
      //       pvp: pvp.data,
      //     });
      //   }, i * 100);
      // });
      setWow({
        user: profil.data,
        race: race.data,
        realm: realm.data,
        specActive: specActive.data,
        spec: spec.data,
        media: media.data,
        titles: titles.data,
        reputation: reputation.data,
        pvp: pvp.data,
      });
    }
    fetchData();
  }, []);
  console.log(wow);
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
              <div>{`Class: ${wow.specActive.playable_class.name.fr_FR}`}</div>
              <div>{`Specialization: ${wow.specActive.name.fr_FR}`}</div>
              <div>{`Faction: ${wow.race.faction.name.fr_FR}`}</div>
              <div>{`Level: ${wow.user.level}`}</div>
              <div>{`ILevel: ${wow.user.average_item_level}`}</div>
              <div>{`Realm: ${wow.realm.name.fr_FR}`}</div>
            </div>
            <div>
              <h2>Specialization</h2>
              <div>{`Class: ${wow.specActive.playable_class.name.fr_FR}`}</div>
              <div>{`Specialization: ${wow.specActive.name.fr_FR}`}</div>
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
            <div>
              <h2>Réputations</h2>
              <table>
                <tbody>
                  {wow.reputation.reputations.map((value) => (
                    <tr key={value.faction.id}>
                      <td>{value.faction.name.fr_FR}</td>
                      <td>{`${value.standing.value} / ${value.standing.max}`}</td>
                      <td>{value.standing.name.fr_FR}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h2>PVP</h2>
              <p>{`Honor level: ${wow.pvp.honor_level}`}</p>
              <p>{`Honorable kills: ${wow.pvp.honorable_kills}`}</p>
              <table>
                <thead>
                  <tr>
                    <th>Map</th>
                    <th>Win</th>
                    <th>Lose</th>
                    <th>Played</th>
                  </tr>
                </thead>
                <tbody>
                  {wow.pvp.pvp_map_statistics.map((value) => (
                    <tr key={value.world_map.id}>
                      <td>{`${value.world_map.name.fr_FR}`}</td>
                      <td>{`${value.match_statistics.won}`}</td>
                      <td>{`${value.match_statistics.lost}`}</td>
                      <td>{`${value.match_statistics.played}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
        : <p>Loading...</p>}
    </>
  );
};

export default GetUser;
