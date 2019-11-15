import React from 'react';
import { useDispatch } from 'react-redux';
import { setProfil, setToken } from '../../redux/actions';
import AxiosAuth from '../../utils/AxiosAuth';
import request from '../../utils/Request';
import './Search.scss';
// import SearchIcon from '../../assets/img/search.svg';

const Search = () => {
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(setProfil(
      event.target.pseudo.value,
      event.target.realmSlug.value,
      event.target.region.value,
    ));
    const Auth = AxiosAuth();
    request('https://eu.battle.net/oauth/token', Auth).then((result) => dispatch(setToken(result.data.access_token)));
  };
  return (
    <form onSubmit={handleClick}>
      <input name="pseudo" placeholder="Recherche d'un personnage" />
      <input name="realmSlug" placeholder="kaelthas" className="input-select" />
      <input name="region" placeholder="eu" className="input-select" />
      <input type="submit" value="" />
    </form>
  );
};

export default Search;
