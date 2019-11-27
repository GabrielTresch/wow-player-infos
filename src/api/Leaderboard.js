import request from '../utils/Request';
import AxiosAuth from '../utils/AxiosAuth';
import AxiosHeader from '../utils/AxiosHeader';

const Leaderboard = async (token) => {
  let header;
  const faction = ['horde', 'alliance'];
  const raidLeaderboardArray = [];

  if (!token) {
    const Auth = AxiosAuth();
    const getToken = await request('https://eu.battle.net/oauth/token', Auth);
    header = AxiosHeader(getToken.data.access_token);
  } else {
    header = AxiosHeader(token);
  }
  await Promise.all(faction.map(async (value) => {
    const raidLeaderboard = await request(`https://eu.api.blizzard.com/data/wow/leaderboard/hall-of-fame/uldir/${value}?namespace=dynamic-eu`, header);
    raidLeaderboard.data.entries.forEach((val) => {
      raidLeaderboardArray.push({
        guild: val.guild.name,
        faction: value,
        realm: val.guild.realm.name.fr_FR,
        region: val.region,
        date: val.timestamp,
      });
    });
  }));
  raidLeaderboardArray.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));
  return raidLeaderboardArray;
};

export default Leaderboard;
