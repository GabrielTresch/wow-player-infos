import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';

const AchievementsCategories = async (pseudo, realmSlug, region, token, actif) => {
  const header = AxiosHeader(token);
  const categoryArray = [];
  const accountAchievementArray = [];
  let subCategoryArray = [];

  const category = await request('https://eu.api.blizzard.com/data/wow/achievement-category/index?namespace=static-eu&locale=fr_EU', header);
  const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);
  const accountAchievements = await request(getProfil.data.achievements.href, header);
  accountAchievements.data.achievements.forEach((el) => {
    console.log(el.completed_timestamp);
    let dateAchiev = el.completed_timestamp && el.completed_timestamp.toString().substring(0, 10);
    // eslint-disable-next-line radix
    dateAchiev = new Date(parseInt(dateAchiev) * 1000).toLocaleDateString('fr-EU');
    accountAchievementArray.push({
      id: el.id,
      date: dateAchiev,
    });
  });
  await Promise.all(category.data.root_categories.map(async (value) => {
    const getCategory = await request(value.key.href, header);
    let subActif = true;
    if (getCategory.data.name.fr_FR !== 'Guilde') {
      if (getCategory.data.subcategories !== undefined) {
        getCategory.data.subcategories.forEach((element) => {
          subCategoryArray.push({
            id: element.id,
            isActive: subActif,
            name: element.name.fr_FR,
            href: element.key.href,
          });
          subActif = false;
        });
      }
      categoryArray.push({
        order: getCategory.data.display_order,
        // eslint-disable-next-line eqeqeq
        isActive: getCategory.data.display_order == actif,
        rootCategory: getCategory.data.name.fr_FR,
        subCategories: [...subCategoryArray],
        achievements: getCategory.data.achievements,
        accountAchievements: accountAchievementArray,
      });
      subCategoryArray = [];
    }
  }));
  categoryArray.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
  return categoryArray;
};

export default AchievementsCategories;
