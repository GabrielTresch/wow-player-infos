import React from 'react';
import { useDispatch } from 'react-redux';
import setProfil from '../redux/actions';

const Search = () => {
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(setProfil(
      event.target.pseudo.value,
      event.target.realmSlug.value,
      event.target.region.value,
    ));
  };
  return (
    <form onSubmit={handleClick}>
      <input name="pseudo" placeholder="yashuki" />
      <input name="realmSlug" placeholder="kaelthas" />
      <input name="region" placeholder="eu" />
      <input type="submit" value="Rechercher" />
    </form>
  );
};

export default Search;
