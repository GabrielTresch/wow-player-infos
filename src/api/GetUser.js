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

const GetUser = () => {
  const [wow, setWow] = useState({ user: [], race: [] });
  useEffect(() => {
    async function fetchData() {
      const getToken = await axios(
        'https://eu.battle.net/oauth/token', Auth,
      );
      const token = getToken.data;
      // console.log(token);
      const header = {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      };
      const profil = await axios(
        'https://cors-anywhere.herokuapp.com/https://eu.api.blizzard.com/profile/wow/character/kaelthas/yashuki?namespace=profile-eu&locale=fr_EU', header,
      );
      const race = await axios(profil.data.race.key.href, header);
      setWow({ user: profil.data, race: race.data });
    }
    fetchData();
  }, []);

  console.log(wow);
  return (
    <>
      <h1>Wow player info</h1>
      {/* {wow
        ? (
          <>
            <div>{`Name : ${wow.name}`}</div>
            <div>{`Realm : ${wow.realm}`}</div>
            <div>{`Faction : ${wow.faction.name}`}</div>
            <div>{`Level : ${wow.level}`}</div>
            <div>{`Achievements :${wow.achievementPoints}`}</div>
          </>
        )
        : <p>Loading...</p>} */}
    </>
  );
};

export default GetUser;
