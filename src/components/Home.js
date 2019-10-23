/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import request from '../api/Request';
import AxiosHeader from '../api/AxiosHeader';
// import Reputations from '../api/Reputations';
import Specialization from '../api/Specialization';
import HomeProfil from './HomeProfil';
import HomeTitles from './HomeTitles';
// import HomeReputation from './HomeReputation';
import HomePvp from './HomePvp';
import HomeSpe from './HomeSpe';

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
  const [pseudo, setPseudo] = useState('yashuki');
  const [realmSlug, setRealmSlug] = useState('kaelthas');
  const [region, setRegion] = useState('eu');
  const [profil, setProfil] = useState({});
  const [race, setRace] = useState({});
  const [realm, setRealm] = useState({});
  const [media, setMedia] = useState({});
  const [titles, setTitles] = useState({});
  // const [reputations, setReputations] = useState([]);
  const [pvp, setPvp] = useState({});
  const [spe, setSpe] = useState([]);

  // const Spe = useCallback(async () => {
  //   const header = AxiosHeader('EUEggU41IlXD2c43u3Pw3tWv3YpsGSKiBe');
  //   const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);
  //   const getSpe = await Specialization(getProfil.data, header);
  //   setSpe(getSpe);
  // }, [pseudo, realmSlug, region]);


  useEffect(() => {
    // Spe();
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

      // Titles
      const getTitles = await request(getProfil.data.titles.href, header);

      // Reputations
      // const getReputation = await Reputations(getProfil.data.reputations.href, header);
      // console.log(getReputation);

      // Pvp
      const getPvp = await request(getProfil.data.pvp_summary.href, header);

      setProfil(getProfil.data);
      setRace(getRace.data);
      setRealm(getRealm.data);
      setMedia(getMedia.data);
      setTitles(getTitles.data);
      // setReputations(getReputation);
      setPvp(getPvp.data);
    };
    fetchData();
  }, [pseudo, realmSlug, region]);
  console.log(spe);
  return (
    <>
      <form>
        <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="yashuki" />
        <input value={realmSlug} onChange={(e) => setRealmSlug(e.target.value)} placeholder="kaelthas" />
        <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="eu" />
      </form>
      {profil.name !== undefined
        ? (
          <>

            <HomeProfil
              profil={profil}
              race={race}
              realm={realm}
              media={media}
            />
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
