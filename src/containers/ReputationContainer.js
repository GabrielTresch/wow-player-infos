import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../api/Request';
import AxiosHeader from '../api/AxiosHeader';
import AxiosAuth from '../api/AxiosAuth';

const ReputationContainer = () => {
  // const [reputation, setReputation] = useState([]);

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);

  useEffect(() => {
    const fetchData = async () => {
      const Auth = AxiosAuth();
      const getToken = await request('https://eu.battle.net/oauth/token', Auth);
      const header = AxiosHeader(getToken.data.access_token);
      const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);

      const reputations = await request(getProfil.data.reputations.href, header);
      console.log(reputations);
    };
    if (pseudo !== undefined) {
      fetchData();
    }
  }, [pseudo, realmSlug, region]);
  // console.log(reputation);
  return (
    <>
      <h1>Réputation</h1>
    </>
  );
};

export default ReputationContainer;
