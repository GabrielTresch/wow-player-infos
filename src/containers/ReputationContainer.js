import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';
import Reputation from '../components/Reputation';

const ReputationContainer = () => {
  const [reputation, setReputation] = useState([]);
  const [subReputation, setSubReputation] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      const header = AxiosHeader(token);
      const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);
      const getAccountReput = await request(getProfil.data.reputations.href, header);

      const accountReput = [];
      const category = [];
      const reput = [];
      let subCategoryArray = [];
      let subReput = [];
      let mainReput = [];

      getAccountReput.data.reputations.map((value) => (
        accountReput.push({
          name: value.faction.name.fr_FR,
          value: value.standing.value,
          max: value.standing.max,
          etat: value.standing.name.fr_FR,
        })
      ));
      const allReput = await request('https://eu.api.blizzard.com/data/wow/reputation-faction/index?namespace=static-eu&locale=fr_EU', header);

      allReput.data.factions.map(async (el) => {
        const factions = await request(el.key.href, header);
        if (factions.data.factions !== undefined) {
          category.push(factions.data.name.fr_FR);
        }
      });
      await Promise.all(allReput.data.root_factions.map(async (val) => {
        const rootFactions = await request(val.key.href, header);
        if (rootFactions.data.factions !== undefined) {
          rootFactions.data.factions.map(async (element) => {
            if (category.includes(element.name.fr_FR) === true) {
              const subCategory = await request(element.key.href, header);
              if (subCategory.data.factions !== undefined) {
                subCategory.data.factions.forEach((e) => {
                  accountReput.forEach((mainElement) => {
                    if (mainElement.name === e.name.fr_FR) {
                      subReput.push({
                        name: mainElement.name,
                        value: mainElement.value,
                        max: mainElement.max,
                        etat: mainElement.etat,
                      });
                    }
                  });
                });
                if (subReput.length >= 1) {
                  subCategoryArray.push({
                    parentCategory: rootFactions.data.name.fr_FR,
                    name: element.name.fr_FR,
                    subReput: [...subReput],
                  });
                }
                setSubReputation([...subCategoryArray]);
                subReput = [];
              }
            }
          });
          rootFactions.data.factions.forEach((valeur) => {
            accountReput.forEach((mainElement) => {
              if (mainElement.name === valeur.name.fr_FR) {
                mainReput.push({
                  name: mainElement.name,
                  value: mainElement.value,
                  max: mainElement.max,
                  etat: mainElement.etat,
                });
              }
            });
          });
          reput.push({
            // eslint-disable-next-line no-nested-ternary
            id: rootFactions.data.name.fr_FR === 'Classique' ? 0 : rootFactions.data.name.fr_FR === 'Guilde' ? 100000 : rootFactions.data.id,
            name: rootFactions.data.name.fr_FR,
            reputation: [...mainReput],
          });
          mainReput = [];
          subCategoryArray = [];
        }
      }));
      reput.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
      reput.reverse();
      setReputation(reput);
    };
    if (pseudo && realmSlug && region && token) {
      fetchData();
    }
  }, [pseudo, realmSlug, region, token]);
  return (
    <>
      <h1>Reputations</h1>
      {reputation !== undefined
        ? (
          <Reputation
            reputation={reputation}
            subReputation={subReputation}
          />
        )
        : <p>Loading...</p>}
    </>
  );
};

export default ReputationContainer;
