import React from 'react';
import PropTypes from 'prop-types';

const HomeTitles = ({ titles }) => (
  <>
    <h2>Titles</h2>
    {titles.titles !== undefined
      ? (
        <>
          {titles.titles.map((value) => <div key={value.id}>{value.name.fr_FR}</div>)}
        </>
      )
      : <p>Loading...</p>}
  </>
);

HomeTitles.propTypes = {
  titles: PropTypes.object.isRequired,
};

export default HomeTitles;
