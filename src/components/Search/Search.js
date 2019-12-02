import React from 'react';
import { useDispatch } from 'react-redux';
import { setProfil, setToken } from '../../redux/actions';
import AxiosHeader from '../../utils/AxiosHeader';
import AxiosAuth from '../../utils/AxiosAuth';
import request from '../../utils/Request';
import './Search.scss';


const Search = () => {
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    event.persist();

    const Auth = AxiosAuth();
    request('https://eu.battle.net/oauth/token', Auth).then(async (result) => {
      dispatch(setToken(result.data.access_token));
      const header = AxiosHeader(result.data.access_token);
      const getProfil = await request(`https://${event.target.region.value}.api.blizzard.com/profile/wow/character/${event.target.realmSlug.value}/${event.target.pseudo.value}?namespace=profile-${event.target.region.value}&locale=fr_EU`, header);
      const media = await request(getProfil.data.media.href, header);
      console.log(getProfil.data);
      dispatch(setProfil(
        event.target.pseudo.value,
        event.target.realmSlug.value,
        event.target.region.value,
        media.data.avatar_url,
        getProfil.data.name,
        getProfil.data.level,
      ));
    });
  };
  return (
    <form onSubmit={handleClick}>
      <input name="pseudo" value="yashuki" />
      <input name="realmSlug" value="kaelthas" className="input-select" />
      <input name="region" value="eu" className="input-select" />
      <input type="submit" value="" />
    </form>
  );
};

export default Search;
