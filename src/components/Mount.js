import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Mounts from '../api/Mounts';
import useIntersect from '../utils/useIntersect';

const Mount = ({ id, href }) => {
  const [infos, setInfos] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [ref, { entry }] = useIntersect({});

  useEffect(() => {
    if (entry.isIntersecting && !fetched) {
      setFetched(true);
      Mounts(href).then((data) => {
        setInfos(data);
      });
    }
  }, [entry.isIntersecting, fetched, href, infos]);

  return (
    <div ref={ref} id={id}>
      {infos
        ? (
          <>
            <h2>{infos.name}</h2>
            <p>{infos.description}</p>
            <p>{infos.source}</p>
            <img src={infos.img} alt="t" />
          </>
        ) : <p>Loading...</p>}
    </div>
  );
};

Mount.propTypes = {
  id: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
};

export default Mount;
