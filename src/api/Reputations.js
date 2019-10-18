import request from './Request';

async function Reputations(url, header) {
  const reputations = await request(url, header);
  const getCategory = await request('https://eu.api.blizzard.com/data/wow/reputation-faction/index?namespace=static-eu&locale=fr_EU', header);

  const categoryArray = [];
  let reputationArray = [];
  const subCategoryArray = [];
  let subCategoryReputArray = [];

  getCategory.data.root_factions.forEach(async (e) => {
    const category = await request(e.key.href, header);
    if (category.data.factions !== undefined) {
      category.data.factions.forEach(async (el) => {
        reputations.data.reputations.forEach((element) => {
          if (element.faction.name.fr_FR === el.name.fr_FR) {
            reputationArray.push({
              name: element.faction.name.fr_FR,
              value: element.standing.value,
              max: element.standing.max,
              status: element.standing.name.fr_FR,
            });
          }
        });
        setTimeout(async () => {
          const subCategory = await request(el.key.href, header);
          if (subCategory.data.factions !== undefined) {
            subCategory.data.factions.forEach((subElement) => {
              reputations.data.reputations.forEach((rep) => {
                if (rep.faction.name.fr_FR === subElement.name.fr_FR) {
                  subCategoryReputArray.push({
                    name: rep.faction.name.fr_FR,
                    value: rep.standing.value,
                    max: rep.standing.max,
                    status: rep.standing.name.fr_FR,
                  });
                }
              });
            });
            if (subCategoryReputArray.length !== 0) {
              subCategoryArray.push({
                parentCategory: category.data.name.fr_FR,
                subCategoryName: el.name.fr_FR,
                reputations: subCategoryReputArray,
              });
            }
            subCategoryReputArray = [];
          }
        }, 500);
      });
    }
    if (reputationArray.length !== 0) {
      categoryArray.push({
        category: category.data.name.fr_FR,
        reputations: reputationArray,
        subCategory: subCategoryArray,
      });
    }
    reputationArray = [];
  });
  return categoryArray;
}

export default Reputations;
