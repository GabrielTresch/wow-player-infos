import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';
import AxiosAuth from '../utils/AxiosAuth';

const ReputationContainer = () => {
  const [mainReput, setReputation] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);

  useEffect(() => {
    const fetchData = async () => {
      const Auth = AxiosAuth();
      const getToken = await request('https://eu.battle.net/oauth/token', Auth);
      const header = AxiosHeader(getToken.data.access_token);
      const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);


      const categoryArray = [];
      const subCategoryArray = [];
      let reputation = [];
      let reputationArray = [];
      const reputations = await request(getProfil.data.reputations.href, header);

      const getCategory = await request('https://eu.api.blizzard.com/data/wow/reputation-faction/index?namespace=static-eu&locale=fr_EU', header);
      getCategory.data.root_factions.forEach(async (e) => {
        const category = await request(e.key.href, header);

        if (category.data.factions !== undefined) {
          getCategory.data.factions.forEach(async (el, i) => {
            setTimeout(async () => {
              const faction = await request(el.key.href, header);
              if (faction.data.factions !== undefined) {
                faction.data.factions.forEach((rep) => {
                  reputations.data.reputations.forEach((reput) => {
                    if (rep.name.fr_FR === reput.faction.name.fr_FR) {
                      reputation.push({
                        name: reput.faction.name.fr_FR,
                        value: reput.standing.value,
                        max: reput.standing.max,
                        status: reput.standing.name.fr_FR,
                      });
                    }
                  });
                });
                category.data.factions.forEach((val) => {
                  if (val.name.fr_FR === faction.data.name.fr_FR) {
                    subCategoryArray.push({
                      parentCategory: category.data.name.fr_FR,
                      reputations: reputation,
                      subCategory: val.name.fr_FR,
                    });
                  }
                  reputation = [];
                });
                reputationArray = [];
              }
            }, i * 100);
          });
          category.data.factions.forEach((rep) => {
            reputations.data.reputations.forEach((reput) => {
              if (rep.name.fr_FR === reput.faction.name.fr_FR) {
                reputationArray.push({
                  name: reput.faction.name.fr_FR,
                  value: reput.standing.value,
                  max: reput.standing.max,
                  status: reput.standing.name.fr_FR,
                });
              }
            });
          });

          categoryArray.push({
            category: category.data.name.fr_FR,
            subCategory: subCategoryArray,
            reputation: reputationArray,
          });
          setReputation([...categoryArray]);
          reputationArray = [];
        }
      });
    };
    if (pseudo !== undefined) {
      fetchData();
    }
  }, [pseudo, realmSlug, region]);
  return (
    <>
      <h1>Réputation</h1>
      {mainReput !== undefined
        ? (
          <>
            {mainReput.map((value) => (
              <div key={value.category}>
                <h3>{value.category}</h3>
                {value.subCategory.map((el) => (
                  <div key={el.subCategory}>
                    <p>{el.subCategory}</p>
                  </div>
                ))}
              </div>
            ))}
          </>
        )
        : <p>Loading...</p>}
    </>
  );
};

export default ReputationContainer;
