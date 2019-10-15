import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const WowHome = () => {
  const [pseudo, setPseudo] = useState('yashuki');
  const [realmSlug, setRealmSlug] = useState('kaelthas');
  const [region, setRegion] = useState('eu');
  const [token, setToken] = useState();
  // const [profil, setProfil] = useState();

  async function getToken() {
    const response = await axios('https://eu.battle.net/oauth/token', Auth);
    setToken(response.data.access_token);
  }

  // const header = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  // async function getProfil() {
  //   const response = await axios(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);
  //   setProfil(response.data);
  // }

  useEffect(() => {
    getToken();
  }, [pseudo]);

  console.log(token);
  return (
    <>
      <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
      <input value={realmSlug} onChange={(e) => setRealmSlug(e.target.value)} />
      <input value={region} onChange={(e) => setRegion(e.target.value)} />
    </>
  );
};

export default WowHome;
