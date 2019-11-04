import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

const LayoutContainer = ({ children }) => (
  <div className="App">
    <Navigation />
    <main>
      { children }
    </main>
  </div>
);

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
