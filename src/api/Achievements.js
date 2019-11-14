/* eslint-disable eqeqeq */
import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';

// eslint-disable-next-line max-len
const Achievements = async (subCategory, subCategoryActif, accountAchievements, allAchievement, token) => {
  const achievArray = [];
  const header = AxiosHeader(token);
  let checkName = [];
  const idAccountAchiev = [];
  let dateAchiev = '';

  accountAchievements.forEach((element) => {
    idAccountAchiev.push(element.id);
  });

  if (subCategoryActif == 0) {
    await Promise.all(allAchievement.map(async (el) => {
      if (idAccountAchiev.includes(el.id) === true) {
        const achievementInfos = await request(el.key.href, header);
        const media = await request(achievementInfos.data.media.key.href, header);
        if (checkName.includes(el.name.fr_FR) === false) {
          accountAchievements.forEach((e) => {
            if (e.id == achievementInfos.data.id) {
              dateAchiev = e.date;
            }
          });
          achievArray.push({
            id: achievementInfos.data.id,
            order: achievementInfos.data.display_order,
            name: achievementInfos.data.name.fr_FR,
            description: achievementInfos.data.description.fr_FR,
            points: achievementInfos.data.points,
            date: dateAchiev,
            icon: media.data.assets[0].value,
          });
          checkName.push(el.name.fr_FR);
        }
      }
    }));
    checkName = [];
  } else {
    await Promise.all(subCategory.map(async (value) => {
      if (value.id == subCategoryActif) {
        const category = await request(value.href, header);
        await Promise.all(category.data.achievements.map(async (val) => {
          if (idAccountAchiev.includes(val.id) === true) {
            const achievInfos = await request(val.key.href, header);
            const media = await request(achievInfos.data.media.key.href, header);
            if (checkName.includes(val.name.fr_FR) === false) {
              accountAchievements.forEach((e) => {
                if (e.id == achievInfos.data.id) {
                  dateAchiev = e.date;
                }
              });
              achievArray.push({
                id: achievInfos.data.id,
                order: achievInfos.data.display_order,
                name: achievInfos.data.name.fr_FR,
                description: achievInfos.data.description.fr_FR,
                points: achievInfos.data.points,
                date: dateAchiev,
                icon: media.data.assets[0].value,
              });
              checkName.push(val.name.fr_FR);
            }
          }
        }));
        checkName = [];
      }
    }));
  }
  return achievArray;
};

export default Achievements;
