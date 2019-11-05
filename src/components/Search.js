import React from 'react';
import { useDispatch } from 'react-redux';
import profil from '../redux/actions';

const Search = () => {
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(profil(
      event.target.pseudo.value,
      event.target.realmSlug.value,
      event.target.region.value,
    ));
  };
  // const test = useSelector((state) => state);
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
