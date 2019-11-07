import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';
import AxiosAuth from '../utils/AxiosAuth';
// import Reputations from '../api/Reputations';
import Specialization from '../api/Specialization';
import HomeProfil from '../components/HomeProfil';
import HomeStats from '../components/HomeStats';
import HomeStuff from '../components/HomeStuff';
import HomeTitles from '../components/HomeTitles';
// import HomeReputation from './HomeReputation';
import HomePvp from '../components/HomePvp';
import HomeSpe from '../components/HomeSpe';

const Home = () => {
  const [profil, setProfil] = useState({});
  const [stats, setStats] = useState({});
  const [stuff, setStuff] = useState({});
  const [race, setRace] = useState({});
  const [realm, setRealm] = useState({});
  const [media, setMedia] = useState({});
  const [titles, setTitles] = useState({});
  // const [reputations, setReputations] = useState([]);
  const [pvp, setPvp] = useState({});
  const [spe, setSpe] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);

  useEffect(() => {
    const fetchData = async () => {
      const Auth = AxiosAuth();
      const getToken = await request('https://eu.battle.net/oauth/token', Auth);

      const header = AxiosHeader(getToken.data.access_token);

      const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);

      const getSpe = Specialization(getProfil.data, header);

      // Profil
      const getRace = request(getProfil.data.race.key.href, header);
      const getRealm = request(getProfil.data.realm.key.href, header);
      const getMedia = request(getProfil.data.media.href, header);

      // Statistics
      const getStats = request(getProfil.data.statistics.href, header);

      // Titles
      const getTitles = request(getProfil.data.titles.href, header);

      // Reputations
      // const getReputation = Reputations(getProfil.data.reputations.href, header);
      // console.log(getReputation);

      // Stuff
      const getStuff = request(getProfil.data.equipment.href, header);

      // Pvp
      const getPvp = request(getProfil.data.pvp_summary.href, header);
      setProfil(getProfil.data);

      // eslint-disable-next-line max-len
      Promise.all([getRace, getRealm, getMedia, getStats, getTitles, getStuff, getPvp, getSpe]).then((result) => {
        setStats(result[3].data);
        setStuff(result[5].data);
        setRace(result[0].data);
        setRealm(result[1].data);
        setMedia(result[2].data);
        setTitles(result[5].data);
        // setReputations(getReputation);
        setPvp(result[6].data);
        setSpe(result[7].data);
      });
    };
    if (pseudo !== undefined) {
      fetchData();
    }
  }, [pseudo, realmSlug, region]);
  return (
    <>
      {profil.name !== undefined
        ? (
          <>
            <HomeProfil
              profil={profil}
              race={race}
              realm={realm}
              media={media}
            />
            <HomeStats stats={stats} />
            <HomeStuff stuff={stuff} />
            <HomeTitles titles={titles} />
            {/* <HomeReputation reputations={reputations} /> */}
            <HomePvp pvp={pvp} />
            <HomeSpe spe={spe} />
          </>
        )
        : <p>Loading...</p>}
    </>
  );
};

export default Home;
