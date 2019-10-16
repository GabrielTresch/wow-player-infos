import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import request from '../api/Request';
import AxiosHeader from '../api/AxiosHeader';

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
  const [profil, setProfil] = useState();

  useEffect(() => {
    async function fetchData() {
      const getToken = await request('https://eu.battle.net/oauth/token', Auth);
      const header = AxiosHeader(getToken.data.access_token);
      const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);
      // // Profil
      // const race = await request(getProfil.data.race.key.href, header);
      // const realm = await request(getProfil.data.realm.key.href, header);
      // const media = await request(getProfil.data.media.href, header);
      // // Titles
      // const titles = await request(getProfil.data.titles.href, header);
      // // Reputations
      // const reputation = await request(getProfil.data.reputations.href, header);
      // // Pvp
      // const pvp = await request(getProfil.data.pvp_summary.href, header);
      setProfil(getProfil.data);
    }
    fetchData();
  }, [pseudo, realmSlug, region]);
  console.log(profil);
  return (
    <>
      <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
      <input value={realmSlug} onChange={(e) => setRealmSlug(e.target.value)} />
      <input value={region} onChange={(e) => setRegion(e.target.value)} />
    </>
  );
};

export default Home;
