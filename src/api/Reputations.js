import request from './Request';

async function Reputations(url, header) {
  const categoryArray = [];
  const subCategoryArray = [];
  let reputation = [];
  let reputationArray = [];

  const reputations = await request(url, header);
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
      reputationArray = [];
    }
  });
  return categoryArray;
}

export default Reputations;
