import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';

const AchievementsCategories = async (token, actif) => {
  const header = AxiosHeader(token);
  const categoryArray = [];
  const category = await request('https://eu.api.blizzard.com/data/wow/achievement-category/index?namespace=static-eu&locale=fr_EU', header);
  await Promise.all(category.data.root_categories.map(async (value) => {
    const getCategory = await request(value.key.href, header);
    if (getCategory.data.name.fr_FR !== 'Guilde') {
      categoryArray.push({
        order: getCategory.data.display_order,
        // eslint-disable-next-line eqeqeq
        isActive: getCategory.data.display_order == actif,
        rootCategories: getCategory.data.name.fr_FR,
        subCategories: getCategory.data.subcategories,
        achievements: getCategory.data.achievements,
      });
    }
  }));
  categoryArray.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
  return categoryArray;
};

export default AchievementsCategories;
