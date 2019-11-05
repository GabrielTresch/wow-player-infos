import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';
import Search from '../components/Search';

const LayoutContainer = ({ children }) => (
  <div className="App">
    <Navigation />
    <main>
      <Search />
      { children }
    </main>
  </div>
);

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
