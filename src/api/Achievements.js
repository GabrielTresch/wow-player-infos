/* eslint-disable eqeqeq */
import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';

// eslint-disable-next-line max-len
const Achievements = async (subCategory, subCategoryActif, accountAchievements, allAchievement, token) => {
  const achievArray = [];
  const header = AxiosHeader(token);
  let checkName = [];

  if (subCategoryActif == 0) {
    allAchievement.forEach((el) => {
      if (accountAchievements.includes(el.id) === true) {
        if (checkName.includes(el.name.fr_FR) === false) {
          achievArray.push({ name: el.name.fr_FR });
          checkName.push(el.name.fr_FR);
        }
      }
    });
    checkName = [];
    // achievArray.push({ name: 'ok' });
  } else {
    await Promise.all(subCategory.map(async (value) => {
      if (value.id == subCategoryActif) {
        const category = await request(value.href, header);
        // console.log(category.data);
        category.data.achievements.forEach((val) => {
          if (accountAchievements.includes(val.id) === true) {
            if (checkName.includes(val.name.fr_FR) === false) {
              achievArray.push({ name: val.name.fr_FR });
              checkName.push(val.name.fr_FR);
            }
          }
        });
        checkName = [];
      }
    }));
  }
  return achievArray;
};

export default Achievements;
