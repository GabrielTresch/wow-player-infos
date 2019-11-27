import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation/Navigation';
import Search from '../components/Search/Search';
import './LayoutContainer.scss';
import LeaderBoardContainer from './Leaderboard/LeaderboardContainer';

const LayoutContainer = ({ children }) => {
  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);
  const token = useSelector((state) => state.token);

  return (
    <div className="App">
      <Navigation />
      <main>
        <Search />
        {pseudo && realmSlug && region && token
          ? (
            children
          )
          : <LeaderBoardContainer />}
      </main>
    </div>
  );
};

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
