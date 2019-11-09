import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Mounts from '../api/Mounts';
import useIntersect from '../utils/useIntersect';

const Mount = ({ id, href }) => {
  const token = useSelector((state) => state.token);
  const [infos, setInfos] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [ref, { entry }] = useIntersect({});

  useEffect(() => {
    if (entry.isIntersecting && !fetched) {
      setFetched(true);
      Mounts(href, token).then((data) => {
        setInfos(data);
      });
    }
  }, [entry.isIntersecting, fetched, href, infos, token]);

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
