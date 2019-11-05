import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../api/Request';
import AxiosHeader from '../api/AxiosHeader';
// import Reputations from '../api/Reputations';
import Specialization from '../api/Specialization';
import HomeProfil from '../components/HomeProfil';
import HomeStats from '../components/HomeStats';
import HomeStuff from '../components/HomeStuff';
import HomeTitles from '../components/HomeTitles';
// import HomeReputation from './HomeReputation';
import HomePvp from '../components/HomePvp';
import HomeSpe from '../components/HomeSpe';

const Auth = {
  auth: {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD,
  },
  params: {
    grant_type: 'client_credentials',
    scope: 'public',
  },
};

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
      const getToken = await request('https://eu.battle.net/oauth/token', Auth);

      const header = AxiosHeader(getToken.data.access_token);

      const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);

      const getSpe = await Specialization(getProfil.data, header);
      setSpe(getSpe);

      // Profil
      const getRace = await request(getProfil.data.race.key.href, header);
      const getRealm = await request(getProfil.data.realm.key.href, header);
      const getMedia = await request(getProfil.data.media.href, header);

      // Statistics
      const getStats = await request(getProfil.data.statistics.href, header);

      // Titles
      const getTitles = await request(getProfil.data.titles.href, header);

      // Reputations
      // const getReputation = await Reputations(getProfil.data.reputations.href, header);
      // console.log(getReputation);

      // Stuff
      const getStuff = await request(getProfil.data.equipment.href, header);

      // Pvp
      const getPvp = await request(getProfil.data.pvp_summary.href, header);

      setProfil(getProfil.data);
      setStats(getStats.data);
      setStuff(getStuff.data);
      setRace(getRace.data);
      setRealm(getRealm.data);
      setMedia(getMedia.data);
      setTitles(getTitles.data);
      // setReputations(getReputation);
      setPvp(getPvp.data);
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
