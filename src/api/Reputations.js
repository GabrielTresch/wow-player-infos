import request from '../utils/Request';

async function Reputations(url, header) {
  const getAccountReput = await request(url, header);

  const accountReput = [];
  const category = [];
  // const reputation = [];
  const subCategoryArray = [];
  let subReput = [];

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
                    reputation: mainElement,
                  });
                }
              });
            });
            subCategoryArray.push({
              name: element.name.fr_FR,
              subReput: [...subReput],
            });
          }
        }
        subReput = [];
        // console.log(subCategoryArray);
      });
      // reputation.push({
      //   name: rootFactions.data.name.fr_FR,
      //   subCategory: [...subCategoryArray],
      // });
      // console.log(reputation);
      // subCategoryArray = [];
    }
  }));
  return subCategoryArray;
}

export default Reputations;
